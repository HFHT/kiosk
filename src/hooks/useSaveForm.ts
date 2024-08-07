import { useEffect, useState } from "react";
import { useFetch, useOpenAI, useShopifyCustomerSave } from ".";
import { ShopifyCustomerT } from "../helpers";

const CONST_GPT_PROMPT = 'Parse this information into a list of items and quantities: {items}. Your response should be in the following JSON format: [  {    "prod": "Item 1", "qty": "Quantity 1"  }]'

export function useSaveForm(customer: ShopifyCustomerT | undefined, noSave = false, callBack: () => void) {
    const [donationInput, setDonationInput] = useState('')
    const [theFormValues, setTheFormValues] = useState<any | undefined>(undefined)
    const [itemList, getGPT, noResponse, resetGPT]: any = useOpenAI()
    const [items, fetchItems, saveItems, isBusy] = useFetch({ connection: { url: import.meta.env.VITE_MONGO_URL, db: 'Kiosk', collection: 'Donations', key: '_id' }, noSave: noSave, callBack: callBack })
    const [addCustomer, updateCustomer, isBusy1] = useShopifyCustomerSave({ noSave: noSave })

    useEffect(() => {
        if (!itemList) return
        console.log('useSaveForm-useEffect', theFormValues, itemList)
        saveItems(undefined, { ...theFormValues, list: itemList }, true)
    }, [itemList, theFormValues])

    const saveForm = (values: any) => {
        console.log('useSaveForm', values)
        setTheFormValues(values)
        getGPT(CONST_GPT_PROMPT.replace(/{items}/g, values.donations))
    }
    return [saveForm, isBusy || isBusy1] as const
}
