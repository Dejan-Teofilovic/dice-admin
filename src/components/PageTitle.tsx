import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "../Routes/routes";

const getPageName = (path: string): string | undefined => {
  const routeData = routes.find(element => element.path === path);
  return routeData?.name;
}

export default function PageTitle() {
  const { pathname } = useLocation();
  const pageName = useMemo(() => getPageName(pathname), [pathname]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={900}>{pageName}</Typography>
    </Box>
  )
}