import { ShopifyCustomer, ShopifyPhone } from "../components";

export function Kiosk({ props }: any) {
  return (
    <>
      <ShopifyPhone onChange={(e: any) => console.log(e)} />
      <ShopifyCustomer />
    </>
  )
}
