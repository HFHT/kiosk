import { geocodeAddressComponentsTypesType, geocodeType } from "../../services";

export function getAddressComponent(geocode: geocodeType, type: geocodeAddressComponentsTypesType) {
    geocode.results[0].address_components.forEach((geo) => {
        if (geo.types.includes(type)) return geo.long_name
    })
    return ''

}
