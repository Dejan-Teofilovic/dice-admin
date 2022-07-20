import { Fragment, useState } from "react";
import {
  Box,
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Theme
} from "@mui/material"
import { Icon } from '@iconify/react'
import { routes } from "../Routes/routes";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false)
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" mt={3}>
          <Stack direction="row" justifyContent="center" width="80%">
            <Box component="img" src="/assets/images/logo.png" alt="logo" width="60%" />
          </Stack>
          {
            open ? (
              <IconButton onClick={handleDrawerClose}>
                <Icon icon="dashicons:arrow-left-alt2" />
              </IconButton>
            ) : (
              <IconButton onClick={handleDrawerOpen}>
                <Icon icon="dashicons:arrow-right-alt2" />
              </IconButton>
            )
          }

        </Stack>

        <Divider />

        <List>
          {routes.map(route => {
            if (route.name && route.icon) {
              return (
                <ListItemButton key={route.path}>
                  <ListItemIcon sx={{ fontSize: 24 }}>
                    <Icon icon={route.icon} />
                  </ListItemIcon>
                  <ListItemText>{route.name}</ListItemText>
                </ListItemButton>
              )
            }
            return (
              <Fragment key={route.path} />
            )
          })}
        </List>
      </Stack>
    </Drawer>
  )
}