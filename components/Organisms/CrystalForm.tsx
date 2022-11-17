import { FormEventHandler, useCallback, useState } from 'react'
import { Location } from "@prisma/client"
import { BField, BSelect } from '../../components/Atoms';
import useUser from '../../lib/hooks';
import { 
  crystalFields, 
  crystalLocations, 
  CrystalState,
  ViewCrystalProps
} from '../../lib/types/crystal';
// import { useRouter } from 'next/router';
import { BImageFileUploader } from '../Molecules';
import CreateLocations from '../../pages/locations/add';

type CrystalFormProps = ViewCrystalProps & {
  onCreateCrystal: (crystal: CrystalState) => void
}

const CrystalForm: React.FC<CrystalFormProps> = (props) => {
  const { userId } = useUser();
  const crystal = props.crystal;
  const locations = props.locations?.map((location) => location.placeName);

  
  // const router = useRouter()

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

    console.log("event", event);
    
    submitCrystal()
  }, [crystalState])

  const submitCrystal = async (): Promise<any> => {
    const crystal = crystalState

    setCrystalState(crystal)
    props.onCreateCrystal(crystal as CrystalState)
  }

  return (
    <div className="section">
      <div className="columns">
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
            <CreateLocations />
            <div className="columns">
              {crystalLocations.map(field => (
                <div className="column" key={field.key}>
                  <BField label={field.label}>
                    <BSelect
                      placeholder={field.placeHolder} 
                      options={locations}
                      selected={crystalState[field.key]}
                      onChange={(newValue: any) => {
                        setCrystalState((oldCrystalState) => ({...oldCrystalState, [field.key]: newValue}))
                      }}
                      />
                  </BField>
                </div>
              ))}
            </div>

            {
            (userId === crystalState.createdById) && 
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

// CrystalForm.requireAuth = true;

export default CrystalForm;
