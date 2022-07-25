import { Button, Paper, TableCell, TableRow } from "@mui/material"
import { Link as RouterLink, useLocation } from "react-router-dom";
import SelectOrderStatus from "../../components/SelectOrderStatus";
import { stringToEllipsis } from "../../utils/functions";
import { IOrder } from "../../utils/interfaces"

interface IProps {
  listItem: IOrder;
  index: number;
}

export default function OrderRow({ listItem, index }: IProps) {
  const { pathname } = useLocation();

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{listItem.name}</TableCell>
      <TableCell>{listItem.email}</TableCell>
      <TableCell>{listItem.wallet_address}</TableCell>
      <TableCell>{stringToEllipsis(listItem.message, 5)}</TableCell>
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
        <SelectOrderStatus orderId={listItem.id} orderStatusId={listItem.id_order_status} />
      </TableCell>
      <TableCell>
        <Button variant="contained" component={RouterLink} to={`${pathname}/${listItem.id}`}>
          View
        </Button>
      </TableCell>
    </TableRow>
  )
}