import { useState } from "react";
import { Donations, ShopifyCustomer, ShopifyPhone } from "../components";

export function Kiosk({ props }: any) {
  const [customer, setCustomer] = useState()
  return (
    <>
      <ShopifyPhone onChange={(e: any) =>setCustomer(e)} />
      <ShopifyCustomer customer={customer}/>
      <Donations />
    </>
  )
}
