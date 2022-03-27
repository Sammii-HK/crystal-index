import axios from 'axios';
import { Crystal } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import { BField } from '../../components/Atoms';
import useUserId from '../../lib/hooks';
import type { RestrictedReactFC } from '../../lib/hooks'
import { crystalFields, CrystalState } from '../../lib/types/crystal';

const CreateCrystals: RestrictedReactFC = () => {
  const { userId } = useUserId();

  const [crystalState, setCrystalState] = useState<CrystalState>({
    name: undefined,
    bio: undefined,
    otherNames: undefined,
    chakra: [],
    colour: [],
    createdById: userId,
    memento: undefined,
    origin: undefined,
  })

  const createCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    // const filteredCrystalState = crystalState.filter(property => property === 'createdById')

    const res = await axios.post<{crystal?: Crystal, error: string}>(
      '/api/crystal/create', 
      crystalState,
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Crystal create API result", result);
  }, [crystalState]);


  return (
    <div className="section">
      <div>
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
              />
            </BField>
          ))}
          <button type="submit" className="button">Create</button> 
        </form>
        <hr />
        {JSON.stringify(crystalState)}
      </div>
    </div>
  )
}

export default CreateCrystals

CreateCrystals.requireAuth = true

