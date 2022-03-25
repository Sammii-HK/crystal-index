import { BInput, BSelect, BTextArea } from '../../components/Atoms';
import { BTags } from '../../components/Molecules';

export type CrystalState = {
  name: string | undefined,
  bio: string | undefined,
  otherNames: string | undefined,
  colour: string[],
  chakra: string[]
  createdById: string | undefined, //how to say this will always be defined because of the page reroute
  mementoId: number | undefined | null,
  originId: number | undefined | null,
}

export const crystalFields: {
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
    options: [ 'red', 'pink', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white', 'clear' ],
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
  // {
  //   key: 'originId',
  //   component: BSelect,
  //   label: 'Origin Location',
  //   placeHolder: 'Select location',
  //   // options: options,
  //   required: false,
  // },
  // {
  //   key: 'mementoId',
  //   component: BSelect,
  //   label: 'Memento Location',
  //   placeHolder: 'Select location',
  //   // options: options,
  //   required: false,
  // },
];
