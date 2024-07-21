import { useState } from "react";
import { fetchJson } from "../helpers/fetch";

export function usePhoneLookup() {
    const [theResult, setTheResult] = useState<ShopifyCustomerT | null | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const doPhoneLookup = async (phone: string) => {
        setIsLoading(true)
        const response: ShopifyResponseT = await shopifyCustSearch(phone)
        console.log(response, response.theProduct.data)
        setTheResult((response.theProduct.data.customers.length > 0) ? response.theProduct.data.customers[0] : null)
        setIsLoading(false)
        return response
    }

    return [theResult, doPhoneLookup, isLoading] as const

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
        console.log('shopifyCustSearch-fetchJson', response)
        return response ? response : {}
    }
    catch (error) { console.log(error); alert('Empty Barcode DB failed: ' + error); }

}