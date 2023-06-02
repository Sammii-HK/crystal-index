import axios from 'axios';
import { Crystal } from '@prisma/client';
import { useCallback, useState } from 'react'
import type { RestrictedReactFC } from '../../lib/hooks'
import { CrystalRequestData, CrystalProps } from '../../lib/types/crystal';
import CrystalForm from '../../components/Organisms/CrystalForm';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import { useCrystalResponse } from '../../lib/helpers/useCrystalResponse';

const CreateCrystals: RestrictedReactFC<CrystalProps> = (props) => {
  const { locations, crystalInfos } = props;

  const [submissionCount, setSubmissionCount] = useState(0);
  const {crystalResponse, onCrystalResponse} = useCrystalResponse();

  const createCrystal = useCallback(async (crystal: CrystalRequestData) => {
    const res = await axios.post<{crystal?: Crystal, error: string}>(
      '/api/crystal/create', 
      crystal,
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    const result = await res.data;
    console.log("Crystal create API result", result);
    
    onCrystalResponse(res);
    
    setSubmissionCount(oldCount => oldCount + 1);
  }, []);

  return (
    <CrystalForm 
      key={submissionCount}
      onSubmitCrystal={createCrystal} 
      locations={locations} 
      crystalInfos={crystalInfos}
      crystal={null} 
      form={"create"}
      response={crystalResponse}
    />
    )
}

CreateCrystals.requireAuth = true

export default CreateCrystals

export const getServerSideProps: GetServerSideProps<CrystalProps> = async () => {
  const locations = await prisma().location.findMany();
  const crystalInfos = await prisma().crystalInfo.findMany();
  return { 
    props: { 
      locations: locations, 
      crystalInfos, crystal: null,
    }
  }
}
