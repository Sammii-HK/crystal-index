import axios from 'axios';
import { Crystal } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import { BField } from '../../components/Atoms';
import useUser from '../../lib/hooks';
import type { RestrictedReactFC } from '../../lib/hooks'
import { crystalFields, CrystalState } from '../../lib/types/crystal';
import BImageFileUploader from '../../components/Molecules/BImageFileUploader';

const CreateCrystals: RestrictedReactFC<any> = () => {
  const { userId, role } = useUser();

  const [crystalState, setCrystalState] = useState<CrystalState>({
    name: undefined,
    bio: undefined,
    otherNames: undefined,
    chakra: [],
    colour: [],
    createdById: userId,
    memento: undefined,
    origin: undefined,
  });

  const [imageIds, setImageIds] = useState<number[]>([]);

  const createCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    // const filteredCrystalState = crystalState.filter(property => property === 'createdById')

    const res = await axios.post<{crystal?: Crystal, error: string}>(
      '/api/crystal/create', 
      {crystal: crystalState, imageIds},
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Crystal create API result", result);
  }, [crystalState, imageIds]);


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
        <div className="column is-5">
          <form onSubmit={createCrystal}>
            {crystalFields.map(field => (
              <BField label={field.label} key={field.key}>
                <field.component 
                  id={field.key} 
                  placeholder={field.placeHolder} 
                  required={field.required}
                  options={field.options}
                  value={crystalState[field.key]}
                  onChange={(newValue: any) => {
                    setCrystalState((oldCrystalState) => ({...oldCrystalState, [field.key]: newValue}))
                  }}
                  onClick={(newValue: any) => {
                    setCrystalState((oldCrystalState) => ({...oldCrystalState, [field.key]: newValue}))
                  }}
                />
              </BField>
            ))}
            {role === 'unicorn' && <button type="submit" className="button mt-4">Create</button>} 
          </form>
        </div>
      </div>
    </div>
    
  )
}

CreateCrystals.requireAuth = true

export default CreateCrystals


