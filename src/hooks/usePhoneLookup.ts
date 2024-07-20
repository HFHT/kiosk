import { useState } from "react";
import { fetchJson } from "../helpers/fetch";

export function usePhoneLookup() {
    const [theResult, setTheResult] = useState<ShopifyCustomerT | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const doPhoneLookup = async (phone: string) => {
        setIsLoading(true)
        const response: ShopifyResponseT = await shopifyCustSearch(phone)
        console.log(response, response.theProduct.data)
        setTheResult(response.theProduct.data.customers[0])                 //undefined if there is no customer
        setIsLoading(false)
        return response
    }

    return [theResult, doPhoneLookup, isLoading, location] as const

}

async function shopifyCustSearch(phone: string) {
    if (!phone) return;
    console.log(phone)
    let options = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify({
            method: 'searchCust',
            product: `phone=${phone}`
        })
    }
    try {
        const response = await fetchJson(`${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`, options)
        console.log('emptyQueue-fetchJson', response)
        return response
    }
    catch (error) { console.log(error); alert('Empty Barcode DB failed: ' + error); }

}