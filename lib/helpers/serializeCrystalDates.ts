import prisma from "../prisma";

export const findAndSerializeCrystal = async (id: string): Promise<any> => {
  const crystal = await prisma().crystal.findUnique(
    { 
      where: { id: parseInt(id as string) },
      include: {
        createdBy: true,
        image: true,
      },
    }
  );
  const allLocations = await prisma().location.findMany();  
  

  const serialisableCrystal = crystal && {
    ...crystal,
    createdAt: crystal.createdAt.toISOString(),
    updatedAt: crystal.updatedAt.toISOString(),
    image: crystal.image.map(image => image.id),
  };

  console.log(`UPDATE Crystal ${id} result: `, serialisableCrystal)
  
  return {
    crystal: serialisableCrystal,
    locations: allLocations,
  }
};
