import { FormEventHandler, SyntheticEvent, useCallback, useState } from 'react'
import { BField, BSelect } from '../../components/Atoms';
import useUser, { RestrictedReactFC } from '../../lib/hooks';
import { 
  crystalFields, 
  crystalLocationFields, 
  CrystalRequestData,
  CrystalState,
  ViewCrystalProps
} from '../../lib/types/crystal';
import { useRouter } from 'next/router';
import { BImageFileUploader } from '../Molecules';
import NewLocationForm from './NewLocationForm';
import { FaArrowLeft } from 'react-icons/fa';

type CrystalFormProps = ViewCrystalProps & {
  onSubmitCrystal: (crystal: CrystalRequestData) => void
}

const CrystalForm: RestrictedReactFC<CrystalFormProps> = (props) => {
  const { userId } = useUser();
  const crystal = props.crystal;
  const [locations, setLocations] = useState(props.locations?.map((location) => location.placeName) || []);
  const crystalHref=`/crystals/${crystal?.id}`
  const router = useRouter()

  const [crystalState, setCrystalState] = useState<CrystalState>({
    name: crystal?.name,
    bio: crystal?.bio,
    otherNames: crystal?.otherNames,
    chakra: crystal?.chakra!,
    colour: crystal?.colour!,
    createdById: crystal?.createdById,
    memento: crystal?.memento,
    origin: crystal?.origin,
  })  

  const [imageIds, setImageIds] = useState<number[]>(crystal?.image || [])

  const onSubmit: FormEventHandler = useCallback(async event => {
    event.preventDefault();    
    submitCrystal()
  }, [crystalState])

  const submitCrystal = async (): Promise<any> => {
    const crystal = crystalState
    const crystalReq = { crystal, imageIds}

    setCrystalState(crystal)
    
    props.onSubmitCrystal(crystalReq as CrystalRequestData)
  }

  const backArrowOnClick = (e: SyntheticEvent): void => {
    e.preventDefault()
    router.push(crystalHref)
  }

  return (
    <div className="section">
      <div className="mb-5" >
        <a href={crystalHref}>
        <span className={`icon is-small is-left is-clickable`} onClick={backArrowOnClick}>
          <FaArrowLeft />
        </span>
        </a>
      </div>
      <div className="columns container">
        <div className="column is-5">
          <BImageFileUploader
            imageIds={imageIds}
            onChange={(newImageIds: number[]) => {
              setImageIds(newImageIds)
            }}
            onRemoveImage={(removedImageId: number) => {
              setImageIds((oldImageIds) => (oldImageIds?.filter(imageId => imageId !== removedImageId)))
            }}
          />
        </div>
        
        <div className="column is-offset-1">
          <form onSubmit={onSubmit}>
            {crystalFields.map(field => (
              <BField label={field.label} key={field.key}>
                <field.component 
                  id={field.key} 
                  placeholder={field.placeHolder} 
                  required={field.required}
                  options={field.options}
                  value={crystalState[field.key] || ''}
                  onChange={(newValue: any) => {
                    setCrystalState((oldCrystalState) => ({...oldCrystalState, [field.key]: newValue}))
                  }}
                />
              </BField>
            ))}
            <div className="columns">
              {crystalLocationFields.map(field => (
                <div className="column" key={field.key}>
                  <BField label={field.label}>
                    <BSelect
                      placeholder={field.placeHolder} 
                      options={locations}
                      selected={crystalState[field.key]}
                      onChange={(newValue) => {
                        setCrystalState((oldCrystalState) => ({...oldCrystalState, [field.key]: newValue}))
                      }}
                      />
                      <NewLocationForm onCreateLocation={(location) => {
                        setLocations(old => [...old, location.placeName]);
                        setCrystalState((oldCrystalState) => ({...oldCrystalState, [field.key]: location.placeName}))
                      }} />
                  </BField>
                </div>
              ))}
            </div>

            {(userId === crystalState.createdById) && 
              <button 
              type="button" 
              className="button mt-4" 
              onClick={() => submitCrystal()}>
                Update
              </button>
            }

          </form>
        </div>
      </div>
    </div>
  )
}

CrystalForm.requireAuth = true;

export default CrystalForm;
