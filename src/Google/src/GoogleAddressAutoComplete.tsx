import '../index.css'
import { useEffect, useState } from "react"
import { usePlacesAutocomplete } from ".."
import logo1 from '../google_on_white.png'
import { TextInput } from '@mantine/core'

interface GoogleAddressAutoCompleteInterface {
  setPlace: Function
  address?: string | undefined
}
export function GoogleAddressAutoComplete({ setPlace, address = undefined }: GoogleAddressAutoCompleteInterface) {
  const [searchValue, setSearchValue] = useState<string>("")
  const [addr, setAddr] = useState<string>()
  const [predictions, place] = usePlacesAutocomplete(searchValue, addr)

  const handlePredictionSelection = (e: any, prediction: any) => {
    e.preventDefault()
    console.log('handlePredictionSelection', prediction)
    setSearchValue(prediction.description)
    setAddr(prediction.description)
  }

  const showPredictions = () => {
    return (predictions && predictions.length > 0 && (predictions[0]?.description !== searchValue))
  }
  // console.log(searchValue, predictions)

  useEffect(() => {
    address && setSearchValue(address)
  }, [address])
  useEffect(() => {
    addr && setPlace(place)
  }, [addr, place])

  return (
    <>
      <div className='google-form'>
        <div>
          <TextInput
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            size='lg'
            label='Address'
            placeholder='Address...'
          />
        </div>
        {showPredictions() &&
          <div className='pac-container pac-logo'>
            {predictions?.map((prediction: any) => (
              <div key={prediction?.place_id} className='pac-item' onClick={(e: any) => handlePredictionSelection(e, prediction)}>
                <span className='pac-icon pac-icon-marker'></span>
                <span className='pac-item-query'>
                  <span className='pac-matched'>
                    {prediction?.structured_formatting.main_text}
                  </span>
                  <span>
                    {prediction?.structured_formatting.secondary_text}
                  </span>
                </span>
              </div>
            ))}
            <span className='pac-power-by-google'><div>powered by <img className='pac-logo-google' src={logo1} alt="Powered by Google" /></div></span>
          </div>
        }
      </div>
    </>
  )
}