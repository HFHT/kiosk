import { useState } from "react";
import { fetchJson } from "../helpers/fetch";
import { stringOrBlank } from "../helpers";

export function usePhoneLookup() {
    const [theResult, setTheResult] = useState<ShopifyCustomerT | null | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const doPhoneLookup = async (phone: string) => {
        setIsLoading(true)
        const response: ShopifyResponseT = await shopifyCustSearch(phone)
        console.log(response, response.theProduct.data)
        let result:ShopifyCustomerT | null = null
        if (response.theProduct.data.customers.length > 0) {
            result = response.theProduct.data.customers[0]
            result = {...result, formatted_address: `${stringOrBlank(result.default_address?.address1)} ${stringOrBlank(result.default_address?.address2)} ${stringOrBlank(result.default_address?.city)} ${stringOrBlank(result?.default_address?.province_code)}`}
        }
        setTheResult(result)
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