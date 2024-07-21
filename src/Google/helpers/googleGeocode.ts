import { fetchJson } from "../../helpers"

export const googleGeocode = async (placePredictions: any) => {
    return fetchJson(`https://maps.googleapis.com/maps/api/geocode/json?address=${placePredictions}&key=AIzaSyBPaxggE1lSq2eIv2TpsqoDdkBCs2TvhL8`)
}