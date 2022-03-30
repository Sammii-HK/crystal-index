import { FormEventHandler, useCallback, useState } from "react"
import { locationFields, CrystalLocation } from '../../lib/types/location';
import { BField, BInput } from "../Atoms";

type LocationFormProps = {
  onCreateLocation: (location: CrystalLocation) => void
  location?: CrystalLocation
}

const LocationForm: React.FC<LocationFormProps> = (props) => {
  const [locationState, setLocationState] = useState<Partial<CrystalLocation>>({
    placeName: props.location?.placeName || undefined,
    country: props.location?.country || undefined,
    lat: props.location?.lat || undefined,
    long: props.location?.long || undefined,
  })

  const onSubmit: FormEventHandler = useCallback(event => {
    event.preventDefault();
    props.onCreateLocation(locationState as CrystalLocation)
  }, [locationState])

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
            />
          </BField>
        ))}
        <button type="submit" className="button">Create</button> 
      </form>
    </div>
    </div>
  )
}

export default LocationForm