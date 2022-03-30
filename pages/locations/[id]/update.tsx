import axios from 'axios';
import { Location } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import { BField, BInput } from '../../../components/Atoms';
import useUser from '../../../lib/hooks';
import type { RestrictedReactFC } from '../../../lib/hooks'
import { locationFields, LocationState } from '../../../lib/types/location';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import prisma from '../../../lib/prisma';

const UpdateCrystal: RestrictedReactFC<ViewCrystalProps> = (props) => {
  const { role } = useUser()
  const location = props.location;
  const router = useRouter()

  const [crystalState, setCrystalState] = useState<LocationState>({
    placeName: location?.placeName,
    country: location?.country,
    lat: location?.lat,
    long: location?.long,
  })

  const updateCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    // if (location?.createdById !== userId) return //res.status(403)

    const res = await axios.put<{location?: Location, error: string}>(
      `/api/location/${router.query.id}/update`, 
      crystalState,
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Location create API result", result);
  }, [crystalState]);


  return (
    <div className="section">
      <div>
        <form onSubmit={updateCrystal}>
          {locationFields.map(field => (
            <BField label={field.label} key={field.key}>
              <BInput 
                id={field.key} 
                placeholder={field.placeHolder} 
                required={field.required}
                value={crystalState[field.key] || ''}
                onChange={(newValue: any) => {
                  setCrystalState((oldCrystalState) => ({...oldCrystalState, [field.key]: newValue}))
                }}
              />
            </BField>
          ))}

          {role === 'unicorn' && <button type="button" className="button mb-4" onClick={updateCrystal}>Update</button>}
          
        </form>
      </div>
    </div>
  )
}

export default UpdateCrystal

UpdateCrystal.requireAuth = true


type ViewCrystalProps = {
  location: null | Location
}

export const getServerSideProps: GetServerSideProps<ViewCrystalProps> = async (context) => {
  const { id } = context.params!;
  const location = await prisma.location.findUnique({ where: { id: parseInt(id as string) } });

  console.log(`UPDATE Location ${id} result: `, location)
  return { 
    props: {
      location: location,
    }
  }
}
