import { basicField } from './field';
import { BInput, BSelect, BTextArea } from '../../components/Atoms';
import { BTags } from '../../components/Molecules';
import { Crystal, User, Location, CrystalInfo } from '@prisma/client';

export type CrystalState = {
  name: string | undefined,
  crystalInfoId: number | undefined | null,
  bio: string | undefined | null,
  otherNames: string | undefined | null,
  colour: string[],
  chakra: string[]
  createdById: string | undefined,
  memento: string | undefined | null,
  origin: string | undefined | null,
}

export type CrystalRequestData = Omit<CrystalState, 'createdById'> & {
  crystal: Crystal, 
  imageIds: number[],
}

export type CrystalResponse = {
  status: number,
  resultName: string,
}

export type ViewCrystalProps = {
  crystal: null | SerialisableCrystalWithUser
}

export type ViewCrystalsProps = {
  crystals: null | SerialisableCrystalWithUser[],
  galleryView: 'location' | 'profile' | 'mainGallery'
}

export type CrystalProps = {
  crystal: null | SerialisableCrystalWithUser
  locations: null | Location[]
  crystalInfos: null | CrystalInfo[]
}

export type SerialisableCrystalWithUser = Omit<Crystal, 'createdAt' | 'updatedAt'> & 
  {
    // createdBy: User, 
    createdBy: string | null, 
    image: number[],
    crystalInfo: CrystalInfo | null,
    originLocation: string | null, 
    mementoLocation: string | null,
    favouritedBy: string[],
  } & { 
    createdAt: string, 
    updatedAt: string 
  }

export const crystalFields: ({
  key: keyof CrystalState,
} & basicField )[] = [
  {
    key: 'name',
    component: BInput,
    label: 'Crystal Name',
    placeHolder: 'Rose Quartz',
    required: true,
  },
];

export const crystalInfoFields = [
  {
    key: 'info',
    component: BTextArea,
    label: 'Info',
    placeHolder: 'Description',
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
  }
];

export const crystalLocationFields: ({
  key: keyof CrystalState,
} & basicField )[] = [
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
];
