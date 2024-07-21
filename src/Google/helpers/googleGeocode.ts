import { fetchJson } from "../../helpers"

export const googleGeocode = async (placePredictions: any) => {
    return fetchJson(`https://maps.googleapis.com/maps/api/geocode/json?address=${placePredictions}&key=${import.meta.env.VITE_GOOGLE_APIKEY}`)
}