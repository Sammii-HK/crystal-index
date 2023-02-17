import axios from 'axios';
import { Crystal } from '@prisma/client';
import { useCallback } from 'react'
import type { RestrictedReactFC } from '../../../lib/hooks'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import CrystalForm from '../../../components/Organisms/CrystalForm';
import { CrystalRequestData, CrystalProps } from '../../../lib/types/crystal';
import { findAndSerializeCrystalWithLocations } from '../../../lib/helpers/serializeCrystalDates';

const UpdateCrystal: RestrictedReactFC<CrystalProps> = (props) => {
  const router = useRouter()
  const crystal = props.crystal;
  const locations = props.locations;

  const updateCrystal = useCallback(async (crystal: CrystalRequestData) => {
    const res = await axios.put<{crystal?: Crystal, error: string}>(
      `/api/crystal/${router.query.id}/update`, 
      crystal,
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    const result = await res.data;
    console.log("Crystal create API result", result);
  }, []);


  return (
    <CrystalForm onSubmitCrystal={updateCrystal} crystal={crystal} locations={locations} />
  )
}

UpdateCrystal.requireAuth = true;

export default UpdateCrystal;

export const getServerSideProps: GetServerSideProps<CrystalProps> = async (context) => {
  const { id } = context.params!;
  let serializedCrystal
  if (id) serializedCrystal = await findAndSerializeCrystalWithLocations(id as string);

  return { props: { ...serializedCrystal }}
}
