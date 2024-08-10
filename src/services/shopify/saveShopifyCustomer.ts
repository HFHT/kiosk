import { fetchJson } from ".."

export async function saveShopifyCustomer(s: { id: number | null | undefined, customer: any }, noSave = false) {
    console.log('shopifySave', s.customer, s.id)
    const header: any = { method: "POST", headers: new Headers() }
    header.body = JSON.stringify({ data: s.id ? { ...s.customer, id: s.id } : { ...s.customer } })
    if (noSave) {
        console.log(header)
        return []
    }
    try {
        return await fetchJson(
            s.id ?
                import.meta.env.VITE_SHOPIFY_UPDATE_URL
                :
                import.meta.env.VITE_SHOPIFY_CREATE_URL,
            header
        )
    } catch (err) {
        console.log('saveShopifyCustomer-error', err)
        return
    }
}