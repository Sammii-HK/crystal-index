import useUserId from '../../../lib/hooks';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { BTags } from '../../../components/Molecules';
import { Crystal, User } from '@prisma/client';
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback } from 'react';
// import { Crystal } from '@prisma/client';

const fieldsToShow: (keyof SerialisableCrystalWithUser)[] = [ 'name', 'bio', 'otherNames', 'origin', 'memento'  ]
const tagsToShow: ('colour' | 'chakra')[] = [ 'colour', 'chakra',  ]
// const objectKeys = Object.keys(props.crystal)

const ViewCrystal: React.FC<ViewCrystalProps> = (props) => {
  const { userId } = useUserId();
  const crystal = props.crystal;
  const router = useRouter();
  
  const editCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    router.push(`/crystals/${crystal?.id}/update`)
  }, []);

  if (!crystal) return <p>Crystal not found</p>;

  return (
    <div className="section">
      {(userId === crystal.createdById) && <button type="button" className="button mb-4" onClick={editCrystal}>Edit</button>}
      {fieldsToShow.map(field => (
        <div key={field}>
          <p className='my-3'>
            <span className='has-text-weight-bold is-capitalized'>{field}: </span>
            {crystal[field]}
          </p>
        </div>
      ))}
      <hr />
      {tagsToShow.map(field => (
        <div key={field} className="mb-4">
          <h1 className='has-text-weight-bold is-capitalized mb-3'>{field}</h1>
          <BTags options={crystal[field]} value={crystal[field]} />
        </div>
      ))}
    </div>
  )
}

export default ViewCrystal;

type ViewCrystalProps = {
  crystal: null | SerialisableCrystalWithUser
}

type SerialisableCrystalWithUser = Omit<Crystal, 'createdAt' | 'updatedAt'> & {createdBy: User} & {createdAt: string, updatedAt: string}

export const getServerSideProps: GetServerSideProps<ViewCrystalProps> = async (context) => {
  const { id } = context.params!;

  const crystal = await prisma.crystal.findUnique(
    { 
      where: { id: parseInt(id as string) },
      include: { createdBy: true },
    }
  );

  const serialisableCrystal = crystal && {
    ...crystal,
    createdAt: crystal.createdAt.toISOString(),
    updatedAt: crystal.updatedAt.toISOString()
  };

  console.log(`GET Crystal ${id} result: `, serialisableCrystal)
  return { props: {crystal: serialisableCrystal }}
}

// function EditCrystal({ children, href }) {
//   const router = useRouter()

//   const handleClick = (e) => {
//     e.preventDefault()
//     router.push(`/crystals/:id/update`)
//   }
// }


