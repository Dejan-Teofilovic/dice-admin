import { Button, MenuItem, Paper, TableCell, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import useOrders from "../../hooks/useOrders";
import { IOrder } from "../../utils/interfaces"

interface IProps {
  listItem: IOrder;
  index: number;
}

export default function OrderRow({ listItem, index }: IProps) {
  const { orderStatuses } = useOrders()

  const [statusId, setStatusId] = useState(0)

  const handleChangeStatus = (value: string) => {
    setStatusId(Number(value))
  }

  useEffect(() => {
    setStatusId(listItem.id_order_status)
  }, [])
  return (
    <TableRow key={listItem.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{listItem.name}</TableCell>
      <TableCell>{listItem.email}</TableCell>
      <TableCell>{listItem.wallet_address}</TableCell>
      <TableCell>{listItem.message}</TableCell>
      <TableCell>
        {listItem.nft_image && (
          <Paper
            component="img"
            src={listItem.nft_image}
            alt="Nft Image"
            width={50}
            height={50}
            sx={{ objectFit: 'cover' }}
          />
        )}
      </TableCell>
      <TableCell>{listItem.goal_price}</TableCell>
      <TableCell>{listItem.income_price}</TableCell>
      <TableCell>
        {
          orderStatuses && (
            <TextField
              select
              value={statusId}
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
      </TableCell>
      <TableCell>
        <Button variant="contained">
          View
        </Button>
      </TableCell>
    </TableRow>
  )
}