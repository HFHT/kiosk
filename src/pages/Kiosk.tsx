import { useState } from "react";
import { ShopifyCustomer, ShopifyPhone } from "../components";
import { Box, Grid, LoadingOverlay } from "@mantine/core";
import { useTemplate } from "../hooks";

export function Kiosk({ props }: any) {
  const { printTemplate, isTemplateBusy } = useTemplate()

  const [customer, setCustomer] = useState()
  const [phone, setPhone] = useState('+1')
  const [anonymous, setAnonymous] = useState(false)


  const reset = () => {
    console.log('reset')
    setPhone('+1')
    setCustomer(undefined)
    setAnonymous(false)
  }
  return (
    <Box pos='relative'>
      <LoadingOverlay visible={isTemplateBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Grid grow justify="space-around" align="center">
        <ShopifyPhone phone={phone} setPhone={(e: any) => setPhone(e)} anonymous={anonymous} setAnonymous={setAnonymous} onChange={(e: any) => setCustomer(e)} />
      </Grid>
      {(customer !== undefined || anonymous) && <>
        <ShopifyCustomer phone={phone} customer={customer} anonymous={anonymous} reset={reset} template={printTemplate} />
      </>}
    </Box>
  )
}
