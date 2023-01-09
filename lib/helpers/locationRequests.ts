import axios from 'axios';
import { Location } from '@prisma/client';
import prisma from '../prisma';
import { CrystalLocation } from '../types/location';

export const createLocation = async (location: CrystalLocation): Promise<Location | undefined> => {
  const res = await axios.post<{location?: Location, error: string}>(
    '/api/location/create', 
    location,
    { headers: { 'Content-Type': 'application/json' } }
  );

  console.log("createLocation: ", res.data);

  return res.data.location
};

export const findLocation = async (id: string): Promise<any> => {
  return await prisma().location.findUnique( { where: { id: parseInt(id as string) } } );
};

export const searchLocation = async (event: Event, placeName: string) => {
  event.preventDefault();

  const res = await axios.get(
    'https://api.opencagedata.com/geocode/v1/json',
    {
      params: {
        q: placeName,
        key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
      },
    }
  );

  return res.data
};
