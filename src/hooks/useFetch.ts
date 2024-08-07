import { useEffect, useState } from "react"
import { fetchJson } from "../helpers"

interface useFetchInterface {
    connection: { url: string, db: string, collection: string, key: string }
    noSave: boolean
    callBack: () => void
}
export function useFetch({ connection, noSave = false, callBack }: useFetchInterface) {
    const [fetchResponse, setFetchResponse] = useState<any[] | undefined>(undefined)
    const [isBusy, setIsBusy] = useState(false)
    useEffect(() => {
        fetch(null)
    }, [])
    const header: any = { method: "POST", headers: new Headers() }

    const fetch = async (_id?: string | null | undefined) => {
        if (_id === undefined) return undefined
        header.body = JSON.stringify({ method: 'find', db: connection.db, collection: connection.collection, find: _id ? { _id: _id } : {} })
        setIsBusy(true)
        if (noSave) {
            setFetchResponse([])
            console.log(header, connection)
            return
        }
        let response = await fetchJson(connection.url, header)
        if (response.length < 1) {
            setFetchResponse([])
        } else {
            setFetchResponse(response)
        }
        setIsBusy(false)
    }
    const mutate = async (_id: string | undefined, data: any, insert: boolean = false) => {
        console.log('useFetch-mutate', _id, insert, data)
        if (!insert && (_id === undefined)) return undefined
        header.body = JSON.stringify({ method: insert ? 'insertOne' : 'updateOne', db: connection.db, collection: connection.collection, data: { ...data }, find: insert ? {} : { _id: _id } })
        setIsBusy(true)
        if (!noSave) {
            let response = await fetchJson(connection.url, header)
            console.log('fetchJson response', response)
        }
        callBack()
        setIsBusy(false)
    }
    return [fetchResponse, fetch, mutate, isBusy] as const
}
