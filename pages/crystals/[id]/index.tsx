import useUser from '../../../lib/hooks';
import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { BCarousel, BTags } from '../../../components/Molecules';
import { Crystal } from '@prisma/client';
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import classNames from "classnames";

const fieldsToShow: (keyof SerialisableCrystalWithUser)[] = [ 'bio', 'otherNames', 'origin', 'memento',  ]
const tagsToShow: ('colour' | 'chakra')[] = [ 'colour', 'chakra',  ]

type ViewCrystalProps = {
  crystal: null | SerialisableCrystalWithUser
}

type SerialisableCrystalWithUser = Omit<Crystal, 'createdAt' | 'updatedAt'> & 
  {
    createdBy: string | null, 
    image: number[], 
    originLocation: string | null, 
    mementoLocation: string | null,
    favouritedBy: string[],
  } 
  & {createdAt: string, updatedAt: string}


const ViewCrystal: React.FC<ViewCrystalProps> = (props) => {
  const { userId } = useUser();
  const crystal = props.crystal;
  const router = useRouter();
  
  const editCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    router.push(`/crystals/${crystal?.id}/update`)
  }, []);

  const isFavourite = userId && crystal?.favouritedBy.includes(userId) ? true : false;
  
  const handleFavouriteCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    if (!userId) return
    const setFavourite = !isFavourite;


    await axios.put<{crystal?: Crystal, error: string}>(
      `/api/crystal/${router.query.id}/set-favourite`,
      { userId, setFavourite },
      { headers: { 'Content-Type': 'application/json' } }
    )

    router.replace(router.asPath);

  }, [userId, router.query.id, isFavourite])

  if (!crystal) return <p>Crystal not found</p>;

  return (
    <div className="section">
      <div className='columns my-5'>
        <div className="column p-0">
          <h1 className='title is-capitalized'>{crystal.name}</h1>
        </div>
        <div className="column is-flex is-justify-content-flex-end p-0">
          <div className="columns">
            {(userId === crystal.createdById) && 
              <div className="column">
                <button type="button" className="button mb-4 is-pulled-right" onClick={editCrystal}>Edit</button>
              </div>
            }

            {userId && 
              <div className="column">
                <button className="button is-ghost" onClick={handleFavouriteCrystal}>
                  <span className={classNames("icon", { 'has-text-pink': isFavourite})}>  
                    <FaHeart />
                  </span>
                </button>
              </div>
            }

          </div>
        </div>
      </div>
      <div className="columns pt-2">
        <div className="column is-7 p-0">
          <BCarousel imageIds={crystal.image} />
        </div>
        <div className="column is-offset-1">
          {tagsToShow.map(field => (
            crystal[field].length > 0 && <div key={field} className="mb-4">
              <h1 className='has-text-weight-bold is-capitalized mb-3'>{field}</h1>
              <BTags options={crystal[field]} value={crystal[field]} />
            </div>
          ))}
        {fieldsToShow.map(field => (
          crystal[field] && <div key={field}>
            <p className='my-3'>
              <span className='has-text-weight-bold is-capitalized'>{field}: </span>
              {crystal[field]}
            </p>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default ViewCrystal;

export const getServerSideProps: GetServerSideProps<ViewCrystalProps> = async (context) => {
  const { id } = context.params!;

  const crystal = await prisma.crystal.findUnique(
    { 
      where: { id: parseInt(id as string) },
      include: { 
        createdBy: {select: {name: true}},
        image: {select: {id: true}},
        originLocation: {select: {placeName: true}},
        mementoLocation: {select: {placeName: true}},
        favouritedBy: {select: {id: true}},
      },
    }
  );

  const serialisableCrystal = crystal && {
    ...crystal,
    createdAt: crystal.createdAt.toISOString(),
    updatedAt: crystal.updatedAt.toISOString(),
    image: crystal.image.map(image => image.id),
    createdBy: crystal.createdBy.name,
    mementoLocation: crystal.mementoLocation?.placeName || null,
    originLocation: crystal.originLocation?.placeName || null,
    favouritedBy: crystal.favouritedBy.map(user => user.id)
  };

  console.log(`GET Crystal ${id} result: `, serialisableCrystal)
  return { props: {crystal: serialisableCrystal }}
}
