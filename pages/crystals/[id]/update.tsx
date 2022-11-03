import axios from 'axios';
import { Crystal } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import useUser from '../../../lib/hooks';
import type { RestrictedReactFC } from '../../../lib/hooks'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import CrystalForm from '../../../components/Organisms/CrystalForm';
import { ViewCrystalProps } from '../../../lib/types/crystal';
import { findAndSerializeCrystal } from '../../../lib/helpers/serializeCrystalDates';

const UpdateCrystal: RestrictedReactFC<ViewCrystalProps> = (props) => {
  const router = useRouter()
  const crystal = props.crystal;
  const locations = props.locations;
  
  const updateCrystal: FormEventHandler = useCallback(async (crystal) => {

    const res = await axios.put<{crystal?: Crystal, error: string}>(
      `/api/crystal/${router.query.id}/update`, 
      crystal,
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Crystal create API result", result);
  }, []);


  return (
    <div className="section">
      <CrystalForm onCreateCrystal={updateCrystal} crystal={crystal} locations={locations} />
    </div>
  )
}

UpdateCrystal.requireAuth = true;

export default UpdateCrystal;

export const getServerSideProps: GetServerSideProps<ViewCrystalProps> = async (context) => {
  const { id } = context.params!;
  console.log("id", id);
  
  const serializedCrystal = await findAndSerializeCrystal(id);

  console.log("serializedCrystal", serializedCrystal);
  

  return {
    props: {
      ...serializedCrystal
    }
  }
}
