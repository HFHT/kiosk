import { fetchJson } from "..";

export async function shopifyCustSearch(phone: string) {
    if (!phone) return;
    console.log(phone)
    let options = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify({
            search: `phone=${phone}`
        })
    }
    const response = await fetchJson(import.meta.env.VITE_SHOPIFY_SEARCH_URL, options)
    console.log('shopifyCustSearch-fetchJson', response, response.customers)
    return response ? response.customers : {}
}