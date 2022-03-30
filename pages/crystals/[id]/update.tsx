import axios from 'axios';
import { Crystal, User, Location } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import { BField, BSelect } from '../../../components/Atoms';
import useUserId from '../../../lib/hooks';
import type { RestrictedReactFC } from '../../../lib/hooks'
import { crystalFields, CrystalState } from '../../../lib/types/crystal';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import prisma from '../../../lib/prisma';
import { BImageFileUploader } from '../../../components/Molecules';

const crystalLocations: {
  key: keyof CrystalState,
  component: React.FC<any>,
  label: string,
  placeHolder: string,
  required: boolean,
}[] = [
  {
    key: 'origin',
    component: BSelect,
    label: 'Origin Location',
    placeHolder: 'Select location',
    required: false,
  },
  {
    key: 'memento',
    component: BSelect,
    label: 'Memento Location',
    placeHolder: 'Select location',
    required: false,
  },
]

const UpdateCrystal: React.FC<ViewCrystalProps> = (props) => {
  const { userId } = useUserId();
  const crystal = props.crystal;
  const locations = props.locations?.map(location => location.placeName);
  const router = useRouter()

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

  const [imageIds, setImageIds] = useState<number[]>()

  const updateCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    // if (crystal?.createdById !== userId) return //res.status(403)

    const res = await axios.put<{crystal?: Crystal, error: string}>(
      `/api/crystal/${router.query.id}/update`, 
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
            imageIds={imageIds? imageIds : crystal?.image}
            onChange={(newImageIds: number[]) => {
              setImageIds(newImageIds)
            }}
          />
        </div>
        <div className="column is-offset-1">
          <form onSubmit={updateCrystal}>
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

            {(userId === crystalState.createdById) && <button type="button" className="button mt-4" onClick={updateCrystal}>Update</button>}
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateCrystal

// CreateCrystals.requireAuth = true


type ViewCrystalProps = {
  crystal: null | SerialisableCrystalWithUser
  locations: null | Location[]
}

type SerialisableCrystalWithUser = Omit<Crystal, 'createdAt' | 'updatedAt'> & {createdBy: User, image: number[]} & {createdAt: string, updatedAt: string}

export const getServerSideProps: GetServerSideProps<ViewCrystalProps> = async (context) => {
  const { id } = context.params!;

  const crystal = await prisma.crystal.findUnique(
    { 
      where: { id: parseInt(id as string) },
      include: { 
        createdBy: true,
        image: true,
      },
    }
  );

  const allLocations = await prisma.location.findMany()
  

  const serialisableCrystal = crystal && {
    ...crystal,
    createdAt: crystal.createdAt.toISOString(),
    updatedAt: crystal.updatedAt.toISOString(),
    image: crystal.image.map(image => image.id),
  };

  console.log(`UPDATE Crystal ${id} result: `, serialisableCrystal)
  return { 
    props: {
      crystal: serialisableCrystal,
      locations: allLocations,
    }
  }
}
