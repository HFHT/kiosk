import { useState } from "react";
import { ShopifyCustomer, ShopifyPhone } from "../components";
import { Box, Grid, LoadingOverlay } from "@mantine/core";
import { useTemplate } from "../hooks";

export function Kiosk({ props }: any) {
  const { printTemplate, isTemplateBusy } = useTemplate()

  const [customer, setCustomer] = useState()
  const [phone, setPhone] = useState('+1')

  const reset = () => {
    console.log('reset')
    setPhone('+1')
    setCustomer(undefined)
  }
  return (
    <Box pos='relative'>
      <LoadingOverlay visible={isTemplateBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Grid grow justify="space-around" align="center">
        <ShopifyPhone phone={phone} setPhone={(e: any) => setPhone(e)} onChange={(e: any) => setCustomer(e)} />
      </Grid>
      {(customer !== undefined) && <>
        <ShopifyCustomer phone={phone} customer={customer} reset={reset} template={printTemplate}/>
      </>}
    </Box>
  )
}
