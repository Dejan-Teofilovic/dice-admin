import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { MESSAGE_FILL_IN_ALL_VALUES } from "../utils/constants";

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useUser()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  const handleSubmit = () => {
    if (firstName && lastName && email && password && adminPassword) {
      signup({ firstName, lastName, email, password, adminPassword })
    } else {
      alert(MESSAGE_FILL_IN_ALL_VALUES)
    }
  }

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Card sx={{ width: { xs: '90%', sm: '50%', md: '30%' } }}>
        <CardHeader
          title="Sign up"
          titleTypographyProps={{ fontWeight: 800 }}
        />
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              type="password"
              label="Common Password for administrators"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              fullWidth
            />
            <Stack direction="row" justifyContent="end">
              <Button variant="contained" onClick={handleSubmit}>Login</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}