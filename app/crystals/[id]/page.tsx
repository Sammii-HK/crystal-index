
import { findAndSerializeCrystal } from '../../../lib/helpers/serializeCrystalDates';
import { Metadata } from 'next';
import ViewCrystal from '../../../components/ViewCrystal';

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {  
  const serialisableCrystal = await findAndSerializeCrystal(parseInt(params.id as string))

  return {
    title: `${serialisableCrystal.name} Identification, Healing Properties & Meaning`,
    description: serialisableCrystal.crystalInfo?.info,
    keywords: ['crystal index', 'crystal identification', "healing", "properties", "identification", "meaning", "power", " " + serialisableCrystal.name, ...serialisableCrystal.crystalInfo?.colour, 'color', 'colour', ...serialisableCrystal.crystalInfo?.chakra, 'chakra']
  }
}

export default async function Page({
  params,
}: {
  params: { id: string }
}) {
  const serialisableCrystal = await findAndSerializeCrystal(parseInt(params.id as string))

  return (
    <ViewCrystal crystal={serialisableCrystal} />
  )
}
