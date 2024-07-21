import { useState, useEffect } from "react"
import { googleGeocode, predictionType } from ".."

export function useGoogleGeocode(text = "", debounceTimeout = 400) {
    const [place, setPlace] = useState<predictionType[]>([])
    useEffect(() => {
        const handleDebounce = setTimeout(async () => {
            try {
                if (!text) {
                    setPlace([])
                    return
                }
                const geocode = await googleGeocode(text)
                setPlace(geocode)
            } catch (e) {
                console.error(e)
            }
        }, debounceTimeout)

        return () => {
            clearTimeout(handleDebounce)
        }
    }, [text, debounceTimeout])

    return place
}