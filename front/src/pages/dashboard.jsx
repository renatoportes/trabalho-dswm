
import TeamSwitcher from './../components/team-switcher';
import { MainNav } from './../components/main-nav';
import { UserNav } from './../components/user-nav';
import { CalendarDateRangePicker } from './../components/date-range-picker';
import { Tabs, TabsContent, TabsTrigger, TabsList, } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../components/ui/card"
import { Button } from '../components/ui/button';
import { RecentSales } from './../components/recent-sales';
import { ModeToggle } from './../components/mode-toggle';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { MonthlyBilling } from './../components/monthly-billing';
import { CircleDollarSignIcon, Loader, Loader2, Plus } from 'lucide-react';
import { ScrollArea } from "../components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function DashboardPage() {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [total_billing, setTotalBilling] = useState('')


  async function loadData() {
    const { data } = await axios.get('http://localhost:3030/overview')
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='h-[calc(100vh-65px)]'>
      <div className="flex-col h-full w-full">
        <div className="border-b border-slate-300">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        {
          loading && <div className="flex space-y-4 p-8 pt-6 bg-slate-200 dark:bg-slate-700 h-full w-full justify-center items-center">
            <Loader2 className='animate-spin w-20 h-20' />
          </div>
        }
        {
          !loading &&
          <div className="flex-1 space-y-4 p-8 pt-6 bg-slate-200 dark:bg-slate-700 h-full w-full">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger className='flex flex-row justify-center items-center gap-2 text-lg font-semibold p-2' asChild>
                    <Button variant="ghost" className='p-6'>
                      <CircleDollarSignIcon className='h-8 w-8' />
                      Vender
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Adicionar venda</AlertDialogTitle>
                      <AlertDialogDescription>
                        Aqui você pode adicionar uma nova venda
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form className='gap-2 flex flex-col'>
                      <Label>Nome do cliente</Label>
                      <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                      <Label>Email do cliente</Label>
                      <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                      <Label>Total da venda</Label>
                      <Input type="number" onChange={(e) => setTotalBilling(e.target.value)} value={total_billing} />
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => axios.post("http://localhost:3030/sales", {
                          data: {
                            name: name,
                            email: email,
                            total_billing: total_billing,
                          }
                        })}>Salvar</AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Geral</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                  Analytics
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Faturamento total
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">R$ {data.sales.reduce((acc, item) => acc + item.total_billing, 0)?.toFixed(2)}</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% a mais que o ultimo mês
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Assinantes
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+ {data.subscribers}</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% a mais que o ultimo mês
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Vendas</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+ {data?.sales[0]?.total_billing?.toFixed(2)}</div>
                      <p className="text-xs text-muted-foreground">
                        +19% a mais que o ultimo mês
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ativos agora
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+ {data.active_now}</div>
                      <p className="text-xs text-muted-foreground">
                        +201 desde a última hora
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Faturamento mensal</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <MonthlyBilling data={data.monthly_billing} />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Vendas recentes</CardTitle>
                      <CardDescription>
                        {(data.sales.length / 2).toFixed()} vendas esse mês
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[25rem] rounded-md border p-4">
                        <div className='flex flex-col space-y-8'>
                          {
                            data?.sales?.map((item, i) => {
                              return <RecentSales data={item} key={i} />
                            })
                          }
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        }
      </div>
    </div>
  )
}