import { useState } from "react";
import { fetchJson } from "../helpers/fetch";
import { ShopifyCustomerT, shopifyCustSearch, stringOrBlank, uniqueKey } from "../helpers";

export function useShopifyPhoneLookup() {
    const [theResult, setTheResult] = useState<ShopifyCustomerT | { id: number, formatted_address: string } | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const doPhoneLookup = async (phone: string) => {
        setIsLoading(true)
        const response: ShopifyResponseT = await shopifyCustSearch(phone)
        console.log(response, response.theProduct.data)
        if (response && response.theProduct.data.customers.length > 0) {
            let result: ShopifyCustomerT = response.theProduct.data.customers[0]
            result = { ...result, formatted_address: `${stringOrBlank(result.default_address?.address1)} ${stringOrBlank(result.default_address?.address2)} ${stringOrBlank(result.default_address?.city)} ${stringOrBlank(result?.default_address?.province_code)}` }
            setTheResult(result)
        } else {
            console.log('customer not found', theResult)
            setTheResult({ id: uniqueKey(), phone: phone, formatted_address: '' })
        }
        setIsLoading(false)
        return
    }
    return [theResult, doPhoneLookup, isLoading] as const
}

