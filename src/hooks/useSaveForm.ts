import { useState } from "react";
import { getChatGPT, googleGeocode, saveMongo, saveShopifyCustomer } from "../services";
import { KioskFormType } from "../components";
import { getAddressComponent } from "../utils";

const CONST_GPT_PROMPT = 'Parse this information into a list of items and quantities: {items}. Your response should be in the following JSON format: [  {    "prod": "Item 1", "qty": "Quantity 1"  }]'

export function useSaveForm(noSave = false, callBack: () => void) {
    const [isBusy, setIsBusy] = useState(false)

    const saveForm = async (values: KioskFormType) => {
        console.log('useSaveForm', values)
        setIsBusy(true)
        // 1) Get parsed donation list from Open AI
        const itemList = await getChatGPT(CONST_GPT_PROMPT.replace(/{items}/g, values.donations))
        console.log('itemList', itemList)
        // 2) Get address details from google
        const geocode = await googleGeocode(values.place?.description)
        console.log('geocode', geocode)
        // 3) Save to MongoDB and Shopify
        const mongoSave = await saveMongo({ _id: undefined, data: { ...values, list: itemList }, insert: true, db: 'Kiosk', collection: 'Donations', noSave: noSave })
        const shopifySave = await saveShopifyCustomer({
            customer: {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                phone: values.phone,
                note: values.donations,
                tags: 'kiosk',
                send_email_welcome: false,
                addresses: [{
                    address1: `${getAddressComponent(geocode,'street_number')} ${getAddressComponent(geocode,'route')}`,
                    address2: values.address2,
                    city: getAddressComponent(geocode,'locality'),
                    province: getAddressComponent(geocode,'administrative_area_level_1'),
                    country: getAddressComponent(geocode,'country'),
                    phone: values.phone,
                    zip: values.zip,
                    first_name: values.firstName,
                    last_name: values.lastName,
                    company: values.company
                }]
            }
        })
        // Cleanup
        callBack()
        setIsBusy(false)
    }
    return [saveForm, isBusy] as const
}
