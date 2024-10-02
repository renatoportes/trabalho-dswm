import { Trash2 } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { Button } from "./ui/button"
import axios from 'axios';

export function RecentSales(props) {
  const data = props.data
  return (
    <div className="flex items-center" key={data.id}>
      <Avatar className="h-9 w-9">
        <AvatarImage src={data.avatar_url} alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {data.email}
        </p>
      </div>
      <div className="ml-auto font-medium">+R$ {data.total_billing.toFixed(2)}</div>
      <Button className="p-1 px-2 ml-4" variant="ghost" onClick={() => axios.delete("http://localhost:3030/sales", {
        data: {
          id: data.id
        }
      })}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
