import { fetchJson } from "."

export async function getPrintTemplate() {
    const header: any = { method: "GET", headers: new Headers() }
    return await fetchJson(`${import.meta.env.VITE_KIOSK_URL}getPrintTemplate`, header)
}
