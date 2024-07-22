import { useState } from "react";
import { Donations, ShopifyCustomer, ShopifyPhone } from "../components";
import { Button, Grid } from "@mantine/core";

export function Kiosk({ props }: any) {
  const [customer, setCustomer] = useState()
  const [phone, setPhone] = useState('')

  const reset = () => {
    console.log('reset')
    setPhone('')
    setCustomer(undefined)
  }
  return (
    <>
      <Grid grow justify="space-around" align="center">
        <ShopifyPhone phone={phone} setPhone={(e: any) => setPhone(e)} onChange={(e: any) => setCustomer(e)} />
      </Grid>
      {(customer !== undefined) && <>
        <ShopifyCustomer customer={customer} reset={reset} />
      </>}
    </>
  )
}
