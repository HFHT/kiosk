import { fetchJson } from "..";

export async function shopifyCustSearch(phone: string) {
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