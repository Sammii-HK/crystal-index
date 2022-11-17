import axios from 'axios';
import { Location } from '@prisma/client';
import prisma from '../prisma';

export const createLocation = async (location: Location): Promise<any> => {
  const res = await axios.post<{location?: Location, error: string}>(
    '/api/location/create', 
    location,
    { headers: { 'Content-Type': 'application/json' } }
  );

  const result = res.data;
  console.log("Location create API result", result);
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

  // console.log("res", res);
  return res.data
};
