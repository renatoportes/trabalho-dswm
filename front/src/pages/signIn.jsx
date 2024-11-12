import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { useContext } from "react"
import { LogIn, LockIcon, LoaderIcon } from "lucide-react"
import { User } from "lucide-react"
import { useSignIn } from "../hooks/useSignIn"
import { AuthContext } from "../contexts/auth"
import { Mail } from "lucide-react"
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const { signInWithEmail, loading, signInWithGoogle } = useContext(AuthContext);
  const { errors, handleSubmit, register } = useSignIn();
  
  return (
    <div className="w-screen h-screen justify-center items-center flex bg-slate-100 dark:bg-slate-600">
      <Tabs defaultValue="account" className="w-[calc(100vw-135px)] sm:max-w-[425px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Esqueci a senha</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <form onSubmit={handleSubmit(signInWithEmail)}>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Faça login e entre na plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email" className="flex-row flex">
                    <Mail className="w-4 h-4 mr-1" />
                    E-mail
                  </Label>
                  <Input type="text" {...register("email")} autoFocus />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name" className="flex-row flex">
                    <LockIcon className="w-4 h-4 mr-1" />
                    Senha
                  </Label>
                  <Input type="password" {...register("password")} />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
                <CardFooter className="p-0">
                  <Button variant="default" type="submit">
                    Logar
                    {loading ? <LoaderIcon className="w-4 h-4 ml-2 animate-spin" /> : <LogIn className="w-4 h-4 ml-2" />}
                  </Button>
                </CardFooter>
              </CardContent>
            </form>
            <p className="flex items-center justify-center text-foreground text-sm pb-3">OU</p>
            <div className="space-y-1 flex items-center justify-center mb-6">
              <Button variant="ghost" type="button" className="pl-1" onClick={() => signInWithGoogle()}>
                <FcGoogle className="w-10 h-7" />
                Logar com Google
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <form >
              <CardHeader>
                <CardTitle>Senha</CardTitle>
                <CardDescription>
                  Mude sua senha, caso tenha esquecido.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="user">Usuário</Label>
                  <Input id="user" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="current">Senha atual</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Nova senha</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Salvar senha</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs >
    </div >
  )
}

export default SignIn;