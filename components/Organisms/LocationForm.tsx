import axios from "axios";
import { FormEventHandler, useCallback, useState } from "react"
import { FaSearch, FaRegTimesCircle } from "react-icons/fa";
import { GeoencodedLocation } from "../../lib/types/geoencodedLocation";
import { locationFields, CrystalLocation } from '../../lib/types/location';
import { BField, BInput } from "../Atoms";

type LocationFormProps = {
  onCreateLocation: (location: CrystalLocation) => void
  location?: CrystalLocation
}

const LocationForm: React.FC<LocationFormProps> = (props) => {
  const [locationState, setLocationState] = useState<Partial<CrystalLocation>>({
    placeName: props.location?.placeName || undefined,
  })

  const [resultState, setResultState] = useState<GeoencodedLocation[]>([])

  const onSubmit: FormEventHandler = useCallback(async event => {
    event.preventDefault();

    await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          q: locationState.placeName,
          key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
        },
      }
    )
    .then(res => {
      // if (res.data.locations[0]) {}      
      console.log("res.data.results[0]", res.data.results[0]);
      
      setResultState(res.data.results)
    })    
  }, [locationState])

  const resultClicked = async (index: number): Promise<any> => {
    const location = {
      placeName: resultState[index].formatted,
      city: resultState[index].components.city,
      country: resultState[index].components.country,
      county: resultState[index].components.county,
      lat: (resultState[index].geometry.lat).toString(),
      long: (resultState[index].geometry.lng).toString(),
    }
    setLocationState(location)
    props.onCreateLocation(location as CrystalLocation)
  }

  return (
    <div className="section">
      <div>
        <form onSubmit={onSubmit}>
          {locationFields.map(field => (
            <BField label={field.label} key={field.key}>
              <BInput 
                id={field.key} 
                placeholder={field.placeHolder} 
                required={field.required}
                value={locationState[field.key] || ''}
                onChange={(newValue: any) => {
                  setLocationState((oldLocationState) => ({...oldLocationState, [field.key]: newValue}))
                }}
                icon={FaSearch}
                iconSize="small"
                iconAlign="right"
                iconOnClick={onSubmit}
              />
            </BField>
          ))}
        </form>
        <div className="mt-5">
          {resultState.map((result, index) => (
            <div 
            className="my-3 is-clickable" key={index}
            onClick={() => resultClicked(index)}
            >
              <p>{result.formatted}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationForm