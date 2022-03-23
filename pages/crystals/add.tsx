import axios from 'axios';
import { Crystal } from '@prisma/client';
import { FormEventHandler, useCallback, useState } from 'react'
import { BField, BInput, BTextArea } from '../../components/Atoms';
import { BTags } from '../../components/Molecules';
import useUserId from '../../lib/hooks';

type CrystalState = {
  name: string,
  bio: string,
  otherNames: string,
  colour: string[],
  chakra: string[]
  createdById: string,
}

const crystalFields: {
  key: keyof CrystalState,
  component: React.FC<any>,
  label: string,
  placeHolder: string,
  required: boolean,
  options?: string[]
}[] = [
  {
    key: 'name',
    component: BInput,
    label: 'Crystal Name',
    placeHolder: 'Rose Quartz',
    required: true,
  },
  {
    key: 'bio',
    component: BTextArea,
    label: 'Bio',
    placeHolder: 'England',
    required: false,
  },
  {
    key: 'otherNames',
    component: BInput,
    label: 'Other Names',
    placeHolder: 'England',
    required: false,
  },
  {
    key: 'colour',
    component: BTags,
    label: 'Colour',
    placeHolder: 'Select colour(s)',
    options: [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white', 'clear' ],
    required: true,
  },
  {
    key: 'chakra',
    component: BTags,
    label: 'Chakra',
    placeHolder: 'Select chakra(s)',
    options: [ 'crown', 'third eye', 'throat', 'heart', 'solar plexus', 'sacral', 'root' ],
    required: false,
  },
];

const CreateCrystals: React.FC = () => {
  const { userId } = useUserId();
  // const session = await getSession({ req });
  const [crystalState, setCrystalState] = useState<CrystalState>({
    name: "",
    bio: "",
    otherNames: "",
    chakra: [],
    colour: [],
    // createdById: userId
  })

  const createCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const res = await axios.post<{crystal?: Crystal, error: string}>(
      '/api/crystal/create', 
      crystalState,
      { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Crystal create API result", result);
  }, [crystalState]);


  return (
    <div className="section">
      <div>
        <form onSubmit={createCrystal}>
          {crystalFields.map(field => (
            <BField label={field.label} key={field.key}>
              <field.component 
                id={field.key} 
                placeholder={field.placeHolder} 
                required={field.required}
                options={field.options}
                value={crystalState[field.key]}
                onChange={(newValue: any) => {
                  setCrystalState((oldCrystalState) => ({...oldCrystalState, [field.key]: newValue}))
                }}
              />
            </BField>
          ))}
          <button type="submit" className="button">Create</button> 
        </form>
        <hr />
        {JSON.stringify(crystalState)}
        <hr />
        {JSON.stringify(userId)}

      </div>
    </div>
  )
}

export default CreateCrystals

