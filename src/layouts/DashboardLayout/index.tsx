import { Box, Stack } from "@mui/material"
import { Outlet } from "react-router"
import PageTitle from "../../components/PageTitle"
import ScrollFab from "../../components/ScrollFab"
import Navbar from "./Navbar"

export default function MainLayout() {
  return (
    <Stack direction="row">
      <Navbar />
      <Box flexGrow={1} p={5}>
        <PageTitle />
        <Outlet />
        <ScrollFab />
      </Box>
    </Stack>
  )
}