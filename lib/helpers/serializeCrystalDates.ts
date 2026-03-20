import { Crystal, User, Image } from "@prisma/client";
import prisma from "../prisma";
import { slugify } from "./slugify";
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
  // Include both ID and blobUrl for image optimization
  image: crystal.image.map(image => ({
    id: image.id,
    blobUrl: (image as any).blobUrl || null,
  })),
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
        image: { select: { id: true, blobUrl: true }}, // Include blobUrl for optimization
        crystalInfo: true,
        originLocation: { select: { placeName: true }},
        mementoLocation: { select: { placeName: true }},
        favouritedBy: { select: { id: true }},
      },
    }
  );

  return crystal && serializeCrystal(crystal);
};

export const findAndSerializeCrystalBySlug = async (slug: string): Promise<any> => {
  // First try matching by the stored slug field
  let crystal = await prisma().crystal.findFirst(
    {
      where: { slug },
      include: {
        createdBy: true,
        image: { select: { id: true, blobUrl: true } },
        crystalInfo: true,
        originLocation: { select: { placeName: true } },
        mementoLocation: { select: { placeName: true } },
        favouritedBy: { select: { id: true } },
      },
    }
  );

  // Fallback: derive slug from name for records that predate the slug column
  if (!crystal) {
    const allCrystals = await prisma().crystal.findMany({
      select: { id: true, name: true },
    });
    const match = allCrystals.find((c) => slugify(c.name) === slug);
    if (match) {
      crystal = await prisma().crystal.findUnique({
        where: { id: match.id },
        include: {
          createdBy: true,
          image: { select: { id: true, blobUrl: true } },
          crystalInfo: true,
          originLocation: { select: { placeName: true } },
          mementoLocation: { select: { placeName: true } },
          favouritedBy: { select: { id: true } },
        },
      });
    }
  }

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
        image: { select: { id: true, blobUrl: true }}, // Include blobUrl for optimization
        originLocation: {select: {placeName: true}},
        mementoLocation: {select: {placeName: true}},
        favouritedBy: { select: { id: true }},
        crystalInfo: true
      },
  });

  return crystalsResults.map(crystal => crystal && serializeCrystal(crystal))
};
