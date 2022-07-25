import { useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import useOrders from "../../hooks/useOrders";
import NoData from "../../components/NoData";
import { NO_DATA } from "../../utils/constants";
import OrderRow from "./OrderRow";

export default function Orders() {
  const { orders, getAllOrderStatusesAct, getAllOrdersAct } = useOrders()

  useEffect(() => {
    getAllOrderStatusesAct()
    getAllOrdersAct()
  }, [])

  return (
    <Box my={5}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 900 }}>No</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Wallet Address</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Message</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Goal price</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Income</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          {
            orders && (
              <TableBody>
                {
                  orders.map((listItem, index) => (
                    <OrderRow key={listItem.id} index={index} listItem={listItem} />
                  ))
                }
              </TableBody>
            )
          }
        </Table>
        {!orders && (<NoData text={NO_DATA} />)}
      </TableContainer>

    </Box>
  )
}