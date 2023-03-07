import axios from 'axios';
import { Crystal } from '@prisma/client';
import { useCallback } from 'react'
import type { RestrictedReactFC } from '../../lib/hooks'
import { CrystalRequestData, CrystalProps } from '../../lib/types/crystal';
import CrystalForm from '../../components/Organisms/CrystalForm';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';

const CreateCrystals: RestrictedReactFC<CrystalProps> = (props) => {
  const { locations, crystal, form } = props;

  const createCrystal = useCallback(async (crystal: CrystalRequestData) => {
    const res = await axios.post<{crystal?: Crystal, error: string}>(
      '/api/crystal/create', 
      crystal,
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    const result = await res.data;
    console.log("Crystal create API result", result);
  }, []);

  return (
    <CrystalForm 
    onSubmitCrystal={createCrystal} 
    locations={locations} 
    crystal={crystal} 
    form={form} />
    )
}

CreateCrystals.requireAuth = true

export default CreateCrystals

export const getServerSideProps: GetServerSideProps<CrystalProps> = async () => {
  const locations = await prisma().location.findMany();
  return { props: { locations: locations, crystal: null, form: 'create'}}
}
