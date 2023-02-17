import useUser from '../../../lib/hooks';
import { GetServerSideProps } from 'next';
import { BCarousel, BTags } from '../../../components/Molecules';
import { Crystal } from '@prisma/client';
import { useRouter } from 'next/router'
import { FormEventHandler, useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import classNames from "classnames";
import { ViewCrystalProps, SerialisableCrystalWithUser } from '../../../lib/types/crystal';
import { findAndSerializeCrystal } from '../../../lib/helpers/serializeCrystalDates';

const fieldsToShow: (keyof SerialisableCrystalWithUser)[] = [ 'bio', 'otherNames', 'origin', 'memento',  ]
const tagsToShow: ('colour' | 'chakra')[] = [ 'colour', 'chakra',  ]

const ViewCrystal: React.FC<ViewCrystalProps> = (props) => {
  const { userId } = useUser();
  const crystal = props.crystal;
  const router = useRouter();
  
  const editCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    router.push(`/crystals/${crystal?.id}/update`)
  }, []);

  const isFavourite = userId && crystal?.favouritedBy?.includes(userId) ? true : false;
  
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
    <div className="section container">
      <div className='columns my-5'>
        <div className="column p-0 is-5 is-offset-1">
          <h1 className='title is-capitalized'>{crystal.name}</h1>
        </div>
        <div className="column is-flex is-justify-content-flex-end p-0 is-5">
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
        <div className="column p-0 is-5 is-offset-1">
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
  const serialisableCrystal = await findAndSerializeCrystal(id as string)

  return { props: { crystal: serialisableCrystal }}
}
