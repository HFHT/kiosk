import { fetchJson } from ".."

export async function saveShopifyCustomer(s: any, noSave = false) {
    console.log('shopifySave', s, s.shopifyId)
    const header: any = { method: "POST", headers: new Headers() }
    header.body = JSON.stringify({
        method: 'addCust',
        product: JSON.stringify(s)
    })
    if (noSave) {
        console.log(header)
        return []
    }
    let response = await fetchJson(`${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`, header)
    console.log('shopifySave', response)
    return response
}
