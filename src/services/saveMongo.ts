import { fetchJson } from "."

export type saveMongoType = {
    _id: string | undefined,
    db: string
    collection: string
    data: any,
    insert?: boolean,
    noSave?: boolean
}
const CONST_URL = import.meta.env.VITE_MONGO_URL

export async function saveMongo({ _id, db, collection, data, insert = false, noSave = false }: saveMongoType) {
    if (!insert && (_id === undefined)) return undefined

    const header: any = { method: "POST", headers: new Headers() }
    header.body = JSON.stringify({ method: insert ? 'insertOne' : 'updateOne', db: db, collection: collection, data: { ...data }, find: insert ? {} : { _id: _id } })

    if (noSave) { console.log(header); return null }

    let response = await fetchJson(CONST_URL, header)
    console.log('fetchJson response', response)
    return response
}
