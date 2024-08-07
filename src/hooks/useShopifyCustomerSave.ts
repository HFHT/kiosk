import { useState } from "react";
import { fetchJson } from "../helpers";

interface ShopifyCustomerSaveInterface {
    id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    phone: string | null
    note: string | null
    tags: string
    address: {
        address1: string | null
        address2: string | null
        city: string | null
        province: string | null
        zip: string | null
        company: string | null
        country: string | null
    }
}
export function useShopifyCustomerSave({noSave = false}) {
    const [isBusy, setIsBusy] = useState(false)
    const header: any = { method: "POST", headers: new Headers() }

    const saveNewShopifyCustomer = async (customer: ShopifyCustomerSaveInterface) => {
        header.body = JSON.stringify({
            method: 'addCust',
            product: JSON.stringify({
                "customer": {
                    "first_name": customer.first_name,
                    "last_name": customer.last_name,
                    "email": customer.email,
                    "phone": customer.phone,  // +15142546011
                    "verified_email": false,
                    "note": customer.note,
                    "tags": customer.tags,
                    "addresses": [
                        {
                            "address1": customer.address.address1,
                            "address2": customer.address.address2,
                            "city": customer.address.city,
                            "province": customer.address.province,  // State
                            "phone": customer.phone,
                            "zip": customer.address.zip,
                            "last_name": customer.first_name,
                            "first_name": customer.last_name,
                            "company": customer.address.company,
                            "country": "US"
                        }
                    ],
                    "send_email_welcome": false
                }
            })
        })

        setIsBusy(true)
        if (noSave) {
            console.log(header)
        } else {
            let response = await fetchJson(`${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`, header)
        }
        setIsBusy(false)
    }

    const updateExistingShopifyCustomer = async (updatedCustomer: ShopifyCustomerSaveInterface, originalCustomer: ShopifyCustomerSaveInterface) => {
        if (!originalCustomer.id) return
        let rcd = { ...originalCustomer, ...updatedCustomer }         // merge changed elements back into original
        header.body = JSON.stringify({
            method: 'addCust',
            product: JSON.stringify({
                "customer": rcd
            })
        })
        setIsBusy(true)
        if (noSave) {
            console.log(header)
        } else {
            let response = await fetchJson(`${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`, header)
        }
        setIsBusy(false)
    }
    return [saveNewShopifyCustomer, updateExistingShopifyCustomer, isBusy] as const
}