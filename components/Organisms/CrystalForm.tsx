import { FormEventHandler, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { BField, BSelect } from '../../components/Atoms';
import useUser, { RestrictedReactFC } from '../../lib/hooks';
import { 
  crystalFields, 
  crystalLocationFields, 
  CrystalRequestData,
  CrystalState,
  CrystalProps,
} from '../../lib/types/crystal';
import { useRouter } from 'next/router';
import { BImageFileUploader } from '../Molecules';
import NewLocationForm from './NewLocationForm';
import { FaArrowLeft } from 'react-icons/fa';
import { checkUser } from '../../lib/helpers/checkUser';
import { NewCrystalInfoForm } from './NewCrystalInfoForm';

type CrystalFormProps = CrystalProps & {
  onSubmitCrystal: (crystal: CrystalRequestData) => void
}

const CrystalForm: RestrictedReactFC<CrystalFormProps> = (props) => {
  const router = useRouter()
  const user = useUser();
  const crystal = props.crystal;
  const form = props.form;
  const [locations, setLocations] = useState(props.locations?.map((location) => location.placeName) || []);
  const [existingCrystalInfos, setExistingCrystalInfos] = useState(props.crystalInfos || []);
  const crystalHref=`/crystals/${crystal?.id}`

  const [crystalState, setCrystalState] = useState<CrystalState>({
    name: crystal?.name,
    crystalInfoId: crystal?.crystalInfoId,
    bio: crystal?.bio,
    otherNames: crystal?.otherNames,
    chakra: crystal?.chakra!,
    colour: crystal?.colour!,
    createdById: crystal?.createdById || user!.userId!,
    memento: crystal?.memento,
    origin: crystal?.origin,
  })  

  const [imageIds, setImageIds] = useState<number[]>(crystal?.image || [])

  useEffect(() => {
    const matchingExistingInfo = existingCrystalInfos.find(info => info.name === crystalState.name);

    if (matchingExistingInfo) {
      setCrystalState(old => ({...old, crystalInfoId: matchingExistingInfo.id}));
    }
  }, [crystalState.name, existingCrystalInfos])

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
      {form === 'update' && <div className="mb-5" >
        <a href={crystalHref}>
        <span className={`icon is-small is-left is-clickable`} onClick={backArrowOnClick}>
          <FaArrowLeft />
        </span>
        </a>
      </div>}
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

            <BField label="Existing Crystal Info">
              <BSelect
                placeholder="" 
                options={
                  useMemo(
                    () => existingCrystalInfos.map(info => info.name),
                    [existingCrystalInfos]
                  )
                }
                selected={
                  useMemo(
                    () => existingCrystalInfos.find(
                      info => info.id == crystalState.crystalInfoId
                    )?.name,
                    [existingCrystalInfos, crystalState.crystalInfoId]
                  )
                }
                onChange={(newValue) => {
                  const selectedId = existingCrystalInfos.find(info => info.name === newValue)?.id;
                  setCrystalState((oldCrystalState) => ({...oldCrystalState, crystalInfoId: selectedId, }))
                }}
              />

              <NewCrystalInfoForm defaultName={crystalState.name} onCreateCrystalInfo={(crystalInfo) => {
                setExistingCrystalInfos(old => [...old, crystalInfo]);
                setCrystalState((oldCrystalState) => ({...oldCrystalState, crystalInfoId: crystalInfo.id}))
              }} />
            </BField>

            <div className="columns mb-0">
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

            {user && checkUser(user) && 
              <div className="column is-12 is-flex is-justify-content-center m-0 p-0">
                <button 
                type="button" 
                className="button mt-4 is-capitalized is-green" 
                onClick={() => submitCrystal()}>
                  {form}
                </button>
              </div>
            }

          </form>
        </div>
      </div>
    </div>
  )
}

CrystalForm.requireAuth = true;

export default CrystalForm;
