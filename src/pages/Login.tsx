import { Button, Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Login() {
  const navigate = useNavigate()
  const { login, token } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    login({ email, password })
  }

  // useEffect(() => {
  //   if (token) {
  //     navigate('/')
  //   }
  // }, [token])

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Card sx={{ width: { xs: '90%', sm: '50%', md: '30%' } }}>
        <CardHeader
          title="Log in"
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
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}