import { FormEventHandler, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { BField, BSelect } from '../../components/Atoms';
import useUser, { RestrictedReactFC } from '../../lib/hooks';
import { 
  crystalFields, 
  crystalLocationFields, 
  CrystalRequestData,
  CrystalState,
  CrystalProps,
  CrystalResponse,
} from '../../lib/types/crystal';
import { useRouter } from 'next/router';
import { BImageFileUploader } from '../Molecules';
import ChooseLocationForm from './ChooseLocationForm';
import { FaArrowLeft } from 'react-icons/fa';
import { checkSub1 } from '../../lib/helpers/checkUser';
import { ChooseCrystalInfoForm } from './ChooseCrystalInfoForm';

type CrystalFormProps = CrystalProps & {
  onSubmitCrystal: (crystal: CrystalRequestData) => void,
  form: "create" | "update",
  response?: CrystalResponse
}

const CrystalForm: RestrictedReactFC<CrystalFormProps> = (props) => {
  const router = useRouter()
  const user = useUser();
  const crystal = props.crystal;
  const form = props.form;
  const crystalResponse = props.response
  const [locations, setLocations] = useState(props.locations || []);
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
    const crystalReq = { crystal: crystalState, imageIds}
    props.onSubmitCrystal(crystalReq as CrystalRequestData)
  }

  const backArrowOnClick = (e: SyntheticEvent): void => {
    e.preventDefault()
    router.push(crystalHref)
  }

  if (crystal && crystal.createdById !== user?.userId) router.push(crystalHref)

  return (
		<div className="section">
			{form === "update" && (
				<div className="mb-5">
					<a href={crystalHref}>
						<span
							className={`icon is-small is-left is-clickable`}
							onClick={backArrowOnClick}
						>
							<FaArrowLeft />
						</span>
					</a>
				</div>
			)}
			<div className="columns container">
				<div className="column is-5">
					<BImageFileUploader
						imageIds={imageIds}
						onChange={(newImageIds: number[]) => {
							setImageIds(newImageIds);
						}}
						onRemoveImage={(removedImageId: number) => {
							setImageIds((oldImageIds) =>
								oldImageIds?.filter((imageId) => imageId !== removedImageId)
							);
						}}
					/>
				</div>

				<div className="column is-offset-1">
					<form onSubmit={onSubmit}>
						{crystalFields.map((field) => (
							<BField label={field.label} key={field.key}>
								<field.component
									id={field.key}
									placeholder={field.placeHolder}
									required={field.required}
									options={field.options}
									value={crystalState[field.key] || ""}
									onChange={(newValue: any) => {
										setCrystalState((oldCrystalState) => ({
											...oldCrystalState,
											[field.key]: newValue,
										}));
									}}
								/>
							</BField>
						))}

						<ChooseCrystalInfoForm
              existingCrystalInfos={existingCrystalInfos}
              selectedCrystalInfoId={crystalState.crystalInfoId}
              onCreateCrystalInfo={newInfo => setExistingCrystalInfos(old => [...old, newInfo])}
              onSelectCrystalInfo={id => setCrystalState(old => ({...old, crystalInfoId: id}))}
            />

						<div className="columns mb-0">
							{crystalLocationFields.map((field) => (
								<div className="column" key={field.key}>
									<ChooseLocationForm
                    id={field.key}
                    label={field.label}
                    placeholder={field.placeHolder}
                    existingLocations={locations}
                    selectedLocation={crystalState[field.key] as string | undefined | null}
                    onCreateLocation={newLocation => setLocations(old => [...old, newLocation])}
                    onSelectLocation={selectedLocation => setCrystalState(old => ({...old, [field.key]: selectedLocation.placeName}))}
                  />
								</div>
							))}
						</div>

						{user && checkSub1(user) && (
							<div className="column is-12 is-flex is-justify-content-center m-0 p-0">
								<button
									type="button"
									className="button mt-4 is-capitalized is-green is-outlined"
									onClick={() => submitCrystal()}
								>
									{form}
								</button>
							</div>
						)}
            {crystalResponse?.status === 200 && 
              <p className='mt-5'>
                {crystalResponse.resultName} has been {form}d
              </p>
            }
					</form>
				</div>
			</div>
		</div>
	);
}

CrystalForm.requireAuth = true;

export default CrystalForm;
