import { useState } from "react";
import { ShopifyCustomer, ShopifyPhone } from "../components";
import { Grid } from "@mantine/core";

export function Kiosk({ props }: any) {
  const [customer, setCustomer] = useState()
  const [phone, setPhone] = useState('+1')

  const reset = () => {
    console.log('reset')
    setPhone('+1')
    setCustomer(undefined)
  }
  return (
    <>
      <Grid grow justify="space-around" align="center">
        <ShopifyPhone phone={phone} setPhone={(e: any) => setPhone(e)} onChange={(e: any) => setCustomer(e)} />
      </Grid>
      {(customer !== undefined) && <>
        <ShopifyCustomer phone={phone} customer={customer} reset={reset} />
      </>}
    </>
  )
}
