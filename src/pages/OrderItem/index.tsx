import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SelectOrderStatus from "../../components/SelectOrderStatus";
import useOrders from "../../hooks/useOrders";

export default function OrderItem() {
  const { orderId } = useParams();
  const { order, getOrderByIdAct, getAllOrderStatusesAct, clearOrderAct } = useOrders();

  useEffect(() => {
    getAllOrderStatusesAct();
    getOrderByIdAct(Number(orderId));

    return () => { clearOrderAct() }
  }, [])

  return (
    <Box>
      <Typography variant="h4" fontWeight={900}>Order Item</Typography>
      {
        order && (
          <Container maxWidth="xl" sx={{ my: 5 }}>
            <Box>
              <Grid container spacing={6}>
                <Grid item md={4}>
                  {
                    order.nft_image && (
                      <Paper
                        component="img"
                        src={order.nft_image}
                        alt="Nft image"
                        elevation={12}
                        sx={{ width: '100%' }}
                      />
                    )
                  }
                </Grid>
                <Grid item md={8}>
                  <Stack spacing={4}>
                    <Card>
                      <CardHeader
                        title="Orderer Info"
                        titleTypographyProps={{ fontWeight: 700 }}
                      />
                      <CardContent>
                        <Stack spacing={1}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="body1" component="span" fontWeight={700}>
                              Name:
                            </Typography>
                            <Typography variant="body1" component="span">
                              {order.name}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="body1" component="span" fontWeight={700}>
                              Email:
                            </Typography>
                            <Typography variant="body1" component="span">
                              {order.email}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="body1" component="span" fontWeight={700}>
                              Wallet address:
                            </Typography>
                            <Typography variant="body1" component="span">
                              {order.wallet_address}
                            </Typography>
                          </Stack>
                        </Stack>

                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader
                        title="Message"
                        titleTypographyProps={{ fontWeight: 700 }}
                      />
                      <CardContent>
                        <Typography variant="body1">
                          {order.message}
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader
                        title="Actions"
                        titleTypographyProps={{ fontWeight: 700 }}
                      />
                      <CardContent>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={4}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <SelectOrderStatus
                            orderId={order.id}
                            orderStatusId={order.id_order_status}
                          />
                          {
                            order.nft_image && (
                              <Button
                                variant="contained"
                                component={Link}
                                href={order.nft_image}
                                target="_blank"
                              >
                                Go to image
                              </Button>
                            )
                          }
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Container>
        )
      }
    </Box>
  )
}