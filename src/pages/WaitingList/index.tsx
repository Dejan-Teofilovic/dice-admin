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
import useWaitingList from "../../hooks/useWaitingList";
import NoData from "../../components/NoData";
import { NO_DATA } from "../../utils/constants";

export default function WaitingList() {
  const { waitingList, getAllWaitingListAct } = useWaitingList()

  useEffect(() => {
    getAllWaitingListAct()
  }, [])

  return (
    <Box my={5}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 900 }}>No</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Wallet Address</TableCell>
            </TableRow>
          </TableHead>
          {
            waitingList && (
              <TableBody>
                {
                  waitingList.map((listItem, index) => (
                    <TableRow key={listItem.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{listItem.email}</TableCell>
                      <TableCell>{listItem.wallet_address}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            )
          }
        </Table>
        {!waitingList && (<NoData text={NO_DATA} />)}
      </TableContainer>

    </Box>
  )
}