/// <reference types="vite/client" />


type ShopifyResponseT = {
    theList: {}
    theProduct: {
        data: {
            customers: ShopifyCustomerT[]
        }
    }
}
