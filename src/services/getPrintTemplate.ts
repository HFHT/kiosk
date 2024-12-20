import { fetchJson } from "."

export async function getPrintTemplate(templateId: string | undefined) {
    const header: any = { method: "GET", headers: new Headers() }
    const urlParms = templateId ? `?_id=${templateId}` : ''
    return await fetchJson(`${import.meta.env.VITE_KIOSK_URL}getPrintTemplate${urlParms}`, header)
}
