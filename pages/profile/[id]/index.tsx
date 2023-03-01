import prisma from '../../../lib/prisma';
import { GetServerSideProps } from 'next';
import { UserWithRelations } from '../../../lib/types/user'
import CrystalGallery from '../../../components/Organisms/CrystalGallery'
import { findAndSerializeCrystal } from '../../../lib/helpers/serializeCrystalDates';
import { useState } from 'react';
import classNames from 'classnames';

type ViewProfileProps = {
  user: null | UserWithRelations
}

const ViewProfile: React.FC<ViewProfileProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>('favourited');
  const user = props.user;
  const tabList = [
    {
      name: 'favourited',
      crystals: props.user!.favouriteCrystals
    },
    {
      name: 'created',
      crystals: props.user!.createdCrystals
    }
  ]
  const getActiveTab = (tabName: string) => tabList.find(tab => tab.name === tabName);
  if (!getActiveTab('created')?.crystals.length) tabList.pop();
  return (
    <div className='section'>
      <div className='tabs is-centered'>
        <ul>
          {tabList.map(tab => {
            return (tab.name !== 'created' || getActiveTab('created')?.crystals.length) && <li
              key={tab.name}
              className={classNames('is-capitalized', tab.name === activeTab && "is-active")} 
              onClick={() => setActiveTab(tab.name)}>
                <a>{tab.name}</a>
              </li>
          })}
        </ul>
      </div>
      <div>
        {
          (activeTab === 'favourited')
            && !getActiveTab(activeTab)!.crystals.length && <p>You have no favourite crystals yet 😶</p>
        }
        { 
          getActiveTab(activeTab)!.crystals &&
          <CrystalGallery crystals={getActiveTab(activeTab)!.crystals} />
        }
      </div>
    </div>
  )
}

export default ViewProfile;

export const getServerSideProps: GetServerSideProps<ViewProfileProps> = async (context) => {
  const { id } = context.params!;

  const crystalIncludeConfig = {
    select: { id: true }
  }

  const user = await prisma().user.findUnique(
    {
      where: { id: id as string },
      include: {
        createdCrystals: crystalIncludeConfig,
        favouriteCrystals: crystalIncludeConfig,
      }
    }
  )

  const serialiseCrystal = async (id: number) => await findAndSerializeCrystal(JSON.stringify(id));
  const serialisedCrystals = (crystals: { id: number }[]) => Promise.all(crystals.map(crystal => serialiseCrystal(crystal.id)))

  const userWithRelations = user && {
    ...user,
    createdCrystals: await serialisedCrystals(user.createdCrystals),
    favouriteCrystals: await serialisedCrystals(user.favouriteCrystals)
  }
  
  return { props: { user: userWithRelations }}
}