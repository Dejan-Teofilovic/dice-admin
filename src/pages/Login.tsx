import { Button, Card, CardContent, CardHeader, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Login() {
  const { login } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    login({ email, password })
  }

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Card sx={{ width: { xs: '90%', sm: '50%', md: '30%' } }}>
        <CardHeader
          title="Login"
          titleTypographyProps={{ fontWeight: 800 }}
        />
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3}>
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
            <Stack direction="row" justifyContent="end">
              <Button variant="contained" onClick={handleSubmit}>Login</Button>
            </Stack>

            <Typography variant="body1">
              Don't have an account?&nbsp;
              <Link component={RouterLink} to="/signup">
                Create a new one.
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}