import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import TeamSwitcher from "../components/team-switcher"
import { MainNav } from "../components/main-nav"
import { ModeToggle } from "../components/mode-toggle"
import { UserNav } from "../components/user-nav"
import { Loader2, Save } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

export function Settings() {

  const [loading, setLoading] = useState(true)

  const [companyName, setCompanyName] = useState('')
  const [cnpj, setCnpj] = useState('')

  async function loadData() {
    const { data } = await axios.get('http://localhost:3030/settings')
    setCompanyName(data.company_name)
    setCnpj(data.cnpj)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="flex min-h-screen w-full h-full flex-col">
      <div className="border-b border-slate-300">
        <div className="flex h-16 items-center px-4 ">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 bg-slate-200 dark:bg-slate-700 h-full w-full">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <a href="#" className="font-semibold text-primary">
              General
            </a>
            <button disabled className="flex">Security</button>
            <button disabled className="flex">Integrations</button>
            <button disabled className="flex">Support</button>
            <button disabled className="flex">Organizations</button>
            <button disabled className="flex">Advanced</button>
          </nav>
          {
            loading &&
            <div className="gap-6 flex justify-center items-center">
              <Loader2 className='animate-spin w-20 h-20' />
            </div>
          }
          {
            !loading &&
            <div className="grid gap-6">
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>Nome da empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    <Input placeholder="Loja do preço barato" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                  </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => axios.put("http://localhost:3030/settings/company-name", {
                    data: {
                      company_name: companyName
                    }
                  })}>
                    <Save className="w-4 h-4 mr-1" />
                    Salvar
                  </Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                  <CardTitle>CNPJ</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col gap-4">
                    <Input
                      placeholder="79.455.260/0001-01"
                      value={cnpj}
                      maxLength={14}
                      onChange={e => setCnpj(e.target.value)}
                    />
                  </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => axios.put("http://localhost:3030/settings/cnpj", {
                    data: {
                      cnpj: cnpj
                    }
                  })}>
                    <Save className="w-4 h-4 mr-1" />
                    Salvar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          }
        </div>
      </main>
    </div>
  )
}
