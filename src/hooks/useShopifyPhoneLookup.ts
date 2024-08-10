import { useState } from "react";
import { ShopifyCustomerT } from "../types";
import { shopifyCustSearch } from "../services";
import { stringOrBlank } from "../utils";

export function useShopifyPhoneLookup() {
    const [theResult, setTheResult] = useState<ShopifyCustomerT | { formatted_address: string } | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const doPhoneLookup = async (phone: string) => {
        setIsLoading(true)
        const customers: ShopifyCustomerT[] = await shopifyCustSearch(phone)
        console.log(customers)
        if (customers && customers.length > 0) {
            let result: ShopifyCustomerT = customers[0]
            // result = { ...result, formatted_address: (result?.default_address?.address1 === null || result!.default_address!.address1 === '') ? '' : `${stringOrBlank(result.default_address?.address1)}${result.default_address?.address2 ? `, ${result.default_address?.address2}` : ''}, ${stringOrBlank(result.default_address?.city)}, ${stringOrBlank(result?.default_address?.province_code)}, ${result?.default_address?.country_code === 'US' ? 'USA' : result?.default_address?.country_code}` }
            setTheResult({ ...result, formatted_address: (result?.default_address?.address1 === null || result!.default_address!.address1 === '') ? '' : `${stringOrBlank(result.default_address?.address1)}${result.default_address?.address2 ? `, ${result.default_address?.address2}` : ''}, ${stringOrBlank(result.default_address?.city)}, ${stringOrBlank(result?.default_address?.province_code)}, ${result?.default_address?.country_code === 'US' ? 'USA' : result?.default_address?.country_code}` })
        } else {
            console.log('doPhoneLookup-customer not found', theResult)
            setTheResult({ phone: phone, formatted_address: '' })
        }
        setIsLoading(false)
        return
    }
    return [theResult, doPhoneLookup, isLoading] as const
}

