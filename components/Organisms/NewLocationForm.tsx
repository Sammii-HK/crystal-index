import axios from "axios";
import { Location } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from "react"
import { FaSearch, FaRegTimesCircle } from "react-icons/fa";
import { GeoencodedLocation } from "../../lib/types/geoencodedLocation";
import { locationFields, CrystalLocation } from '../../lib/types/location';
import { BField, BInput } from "../Atoms";
import { createLocation } from '../../lib/helpers/locationRequests';

// Location fields need to work for a search dropdown with just a place name, and a full list for amends

type LocationFormProps = {
  onCreateLocation: (location: Location) => void
  location?: Omit<CrystalLocation, 'id'>
}

const NewLocationForm: React.FC<LocationFormProps> = (props) => {
  const [locationState, setLocationState] = useState<Partial<CrystalLocation>>({
    placeName: props.location?.placeName || undefined,
  })

  const [resultState, setResultState] = useState<GeoencodedLocation[]>([])

  const onSubmitLocation: FormEventHandler = useCallback(async event => {
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
    .then(res => setResultState(res.data.results))    
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
    props.onCreateLocation(location as Location)
    createLocation(location)
    setResultState([])
    setLocationState({})
  }

  return (
    <div className="mt-4">
      <div>
        
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
                iconOnClick={onSubmitLocation}
                onEnterKey={onSubmitLocation}
              />
            </BField>
          ))}
        
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

export default NewLocationForm