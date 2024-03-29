import { Crystal, User, Image } from "@prisma/client";
import prisma from "../prisma";
// import { getSuperUserId } from "./getSuperUserId";

type CrystalWithRelations = Crystal & {
  createdBy: User,
  image: Image[],
  originLocation: { placeName: string } | null,
  mementoLocation: { placeName: string } | null,
  favouritedBy: { id: string; }[],
}

export const serializeCrystal = (crystal: CrystalWithRelations) => ({
  ...crystal,
  createdAt: crystal.createdAt.toISOString(),
  updatedAt: crystal.updatedAt.toISOString(),
  image: crystal.image.map(image => image.id),
  mementoLocation: crystal.mementoLocation?.placeName || null,
  originLocation: crystal.originLocation?.placeName || null,
  favouritedBy: crystal.favouritedBy.map(user => user.id)
});

export const findAndSerializeCrystal = async (id: number): Promise<any> => {
  const crystal = await prisma().crystal.findUnique(
    { 
      where: { id },
      include: {
        createdBy: true,
        image: { select: { id: true }},
        crystalInfo: true,
        originLocation: { select: { placeName: true }},
        mementoLocation: { select: { placeName: true }},
        favouritedBy: { select: { id: true }},
      },
    }
  );

  return crystal && serializeCrystal(crystal);
};

export const findAndSerializeCrystalWithLocations = async (id: number): Promise<any> => {
  return {
    crystal: await findAndSerializeCrystal(id),
    locations: await prisma().location.findMany()
  }
}

export const findAndSerializeAllCrystals = async (): Promise<any> => {
  const superUserId = process.env.SUPER_USER_ID
  
  const crystalsResults = await prisma().crystal.findMany({
    where: { createdById: superUserId },
    include: { 
        createdBy: true,
        image: { select: { id: true }},
        originLocation: {select: {placeName: true}},
        mementoLocation: {select: {placeName: true}},
        favouritedBy: { select: { id: true }},
        crystalInfo: true
      },
  });

  return crystalsResults.map(crystal => crystal && serializeCrystal(crystal))
};
