import { findAndSerializeCrystal } from '../../../lib/helpers/serializeCrystalDates';
import { Metadata } from 'next';
import ViewCrystal from '../../../components/ViewCrystal';
import { ProductSchema, BreadcrumbSchema } from '../../../components/common/StructuredData';

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crystalindex.co.uk'
  const imageUrl = serialisableCrystal.image?.[0]?.blobUrl || 
    (serialisableCrystal.image?.[0] ? `${baseUrl}/api/image/${serialisableCrystal.image[0].id}` : undefined)

  return (
    <>
      <ProductSchema
        name={serialisableCrystal.name}
        description={serialisableCrystal.crystalInfo?.info}
        image={imageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Crystals', url: '/crystals' },
          { name: serialisableCrystal.name, url: `/crystals/${serialisableCrystal.id}` },
        ]}
      />
      <ViewCrystal crystal={serialisableCrystal} />
    </>
  )
}
