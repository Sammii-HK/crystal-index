import axios from 'axios';
import { Crystal } from '@prisma/client';
import { FormEventHandler, useCallback } from 'react'
import { BField, BInput, BTextArea, BSelect } from '../../components/Atoms';
import { BTagContainer } from '../../components/Molecules';

const crystalFields = [
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
    component: BTagContainer,
    label: 'Colour',
    placeHolder: 'Select colour(s)',
    options: [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white', 'clear' ],
    required: true,
  },
  {
    key: 'chakra',
    component: BTagContainer,
    label: 'Chakra',
    placeHolder: 'Select chakra(s)',
    options: [ 'crown', 'third eye', 'throat', 'heart', 'solar plexus', 'sacral', 'root' ],
    required: false,
  },
]

const CreateCrystals: React.FC = () => {

  const createCrystal: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: {value: string}
      bio: {value: string}
      otherNames: {value: string}
      colour: {value: string[]}
      chakra: {value: string[]}
    };

    const crystalData = {
      name: target.name.value,
      bio: target.bio.value,
      otherNames: target.otherNames.value,
      colour: target.colour.value,
      chakra: target.chakra.value,
    };


    const res = await axios.post<{crystal?: Crystal, error: string}>('/api/crystal/create', 
    crystalData,
    { headers: { 'Content-Type': 'application/json' } }
    );
  
    const result = await res.data;
    console.log("Crystal create API result", result);
  }, []);


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
            tags={field.options}
            />
          </BField>
        ))}
        <button type="submit" className="button">Create</button> 
      </form>
    </div>
    </div>
  )
}

export default CreateCrystals

