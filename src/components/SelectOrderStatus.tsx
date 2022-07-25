import { MenuItem, TextField } from "@mui/material"
import useOrders from "../hooks/useOrders";

interface IProps {
  orderId: number;
  orderStatusId: number;
}

export default function SelectOrderStatus({ orderId, orderStatusId }: IProps) {
  const { orderStatuses, changeOrderStatusAct } = useOrders()

  const handleChangeStatus = async (value: string) => {
    changeOrderStatusAct(orderId, Number(value))
  }

  if (orderStatuses) {
    return (
      <TextField
        select
        value={orderStatusId}
        label="Status"
        onChange={(e) => handleChangeStatus(e.target.value)}
      >
        {
          orderStatuses.map(statusItem => (
            <MenuItem key={statusItem.id} value={statusItem.id}>
              {statusItem.status}
            </MenuItem>
          ))
        }
      </TextField>
    )
  }
  return <></>
}