import classNames from "classnames";
import { useEffect, useState } from "react";
import CrystalGallery from "./CrystalGallery";
import { CrystalLocationWithRelations } from "../../lib/types/location";

type ViewCrystalsOfLocationProps = {
  location: CrystalLocationWithRelations
}

const CrystalsOfLocation: React.FC<ViewCrystalsOfLocationProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>('origin');

  useEffect(() => {
    setActiveTab(props.location.crystalsOfOrigin.length ? 'origin' : 'memento')
  }, [props.location.crystalsOfOrigin, props.location.crystalsOfMemento]);

  // const [matchingCrystals, setMatchingCrystals] = useState<Location[]>(props.origin || [])
  const tabList = [
    {
      name: 'origin',
      crystals: props.location.crystalsOfOrigin
    },
    {
      name: 'memento',
      crystals: props.location.crystalsOfMemento
    }
  ]
  const getActiveTab = (tabName: string) => tabList.find(tab => tab.name === tabName);
  return (
    <div className='container m-3 crystal-gallery'>
      <div className='tabs is-centered location-tabs mb-0'>
        <ul>
          {tabList.map(tab => {
            return (getActiveTab(tab.name)?.crystals?.length) ? <li
              key={tab.name}
              className={classNames('is-capitalized', 'has-text-white', tab.name === activeTab && "is-active")} 
              onClick={() => setActiveTab(tab.name)}>
                <a>{tab.name}</a>
              </li> : undefined
          })}
        </ul>
      </div>
      <div>
        {
          (activeTab === 'favourited')
            && !getActiveTab(activeTab)!.crystals?.length && <p>You have no favourite crystals yet 😶</p>
        }
        { 
          getActiveTab(activeTab)!.crystals && (
            <>
              {/* <SearchCrystals
              crystals={getActiveTab(activeTab)!.crystals}
              onCrystalSearch={setMatchingCrystals} /> */}
              <CrystalGallery
              crystals={getActiveTab(activeTab)!.crystals}
              galleryView="location"
              />
            </>
          )
        }
      </div>
    </div>
  )
}

export default CrystalsOfLocation