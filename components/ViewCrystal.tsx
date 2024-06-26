'use client'

import useUser from '../lib/hooks';
import { BCarousel, BTags } from './Molecules';
import { Crystal, CrystalInfo } from '@prisma/client';
import { useRouter, useParams, usePathname } from 'next/navigation'
import { FormEventHandler, useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import classNames from "classnames";
import { ViewCrystalProps, SerialisableCrystalWithUser } from '../lib/types/crystal';
import axios from 'axios';

const fieldsToShow: (keyof SerialisableCrystalWithUser)[] = [ 
  'bio', 
  'otherNames', 
  'origin',
  'memento'
]

// const fieldLabels = {
//   info: 'information',
//   otherNames: 'other names',
//   origin,
//   memento,
//   colour,
//   chakras,
// }

const infoFieldsToShow: (keyof CrystalInfo)[] = [
  'info',
]
const tagsToShow: ('colour' | 'chakra')[] = [ 'colour', 'chakra' ]

export default function ViewCrystal(props: ViewCrystalProps) {
  const user = useUser();
  const userId = user?.userId;
  const crystal = props.crystal;
  const router = useRouter();  
  
  if (user && userId !== crystal?.createdById) fieldsToShow.pop()
  
  const editCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    router.push(`/crystals/${crystal?.id}/update`)
  }, []);

  const isFavourite = userId && crystal?.favouritedBy?.includes(userId) ? true : false;
  const params = useParams();
  const pathname = usePathname();
  
  const handleFavouriteCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    if (!userId) return
    const setFavourite = !isFavourite;

    console.log("setFavourite", setFavourite);
    console.log("isFavourite", isFavourite);
    
    

    console.log("🍓🍋🍊 params", params);

    await axios.put<{crystal?: Crystal, error: string}>(
      `/api/crystal/${params!.id}/set-favourite`,
      { userId, setFavourite },
      { headers: { 'Content-Type': 'application/json' } }
    )

    router.replace(pathname!);

  }, [userId, params, isFavourite])

  if (!crystal) return <p>Crystal not found</p>;

  return (
    <div className="section">
        <a className='is-6' onClick={() => router.push('/crystals')}>
          Back to crystals
        </a>
      <div className="container">
        <div className='columns my-5 is-mobile is-centered'>
          <div className="column p-0 is-5 is-offset-1 is-6-mobile is-offset-0-mobile">
            <h1 className='title is-capitalized'>{crystal.name}</h1>
          </div>
          <div className="column is-flex is-justify-content-flex-end p-0 is-5 is-1-mobile">
            <div className="columns is-mobile">
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
        <div className="columns pt-2 is-centered is-multiline is-flex">
          <div className="column p-0 is-10-mobile is-5 is-offset-1 is-offset-0-mobile">
            <BCarousel imageIds={crystal.image} />
          </div>
          <div className="column is-4 is-offset-1 is-10-mobile">
            {infoFieldsToShow.map(field => (
              crystal.crystalInfo?.[field] && <div key={field}>
                <p className='my-3'>
                  <span className='has-text-weight-bold is-capitalized'>{field} </span><br />
                  {crystal.crystalInfo[field]}
                </p>
              </div>
            ))}
            {tagsToShow.map(field => (
              crystal.crystalInfo?.[field]?.length && <div key={field} className="mb-4">
                <h1 className='has-text-weight-bold is-capitalized mb-3'>{field}</h1>
                <BTags options={crystal.crystalInfo?.[field]} value={crystal.crystalInfo?.[field]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
