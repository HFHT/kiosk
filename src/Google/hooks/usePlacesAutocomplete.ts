import { useState, useEffect } from "react"
import { googleAutocomplete, googleGeocode, predictionType } from ".."

export function usePlacesAutocomplete(text = '', selected = '', debounceTimeout = 400) {
  const [predictions, setPredictions] = useState<predictionType[]>([])
  const [googlePlace, setGooglePlace] = useState({})

  useEffect(() => {
    const handleDebounce = setTimeout(async () => {
      try {
        if (!text) {
          setPredictions([])
          return
        }
        const nextPredictions = await googleAutocomplete(text)
        //@ts-ignore
        setPredictions(nextPredictions)
      } catch (e) {
        console.error(e)
      }
    }, debounceTimeout)

    return () => {
      clearTimeout(handleDebounce)
    }
  }, [text, debounceTimeout])

  useEffect(() => {
    const handleDebounce = setTimeout(async () => {
      try {
        if (!selected) {
          setGooglePlace([])
          return
        }
        const nextPredictions = await googleGeocode(selected)
        //@ts-ignore
        setGooglePlace(nextPredictions)
      } catch (e) {
        console.error(e)
      }
    }, debounceTimeout)
    return () => {
      clearTimeout(handleDebounce)
    }
  }, [selected])

  return [predictions, googlePlace] as const
}