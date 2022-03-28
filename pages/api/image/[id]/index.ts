import sharp from 'sharp';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function crystalHandler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  const { id, width } = req.query;
  
  const result = await prisma.image.findUnique(
    { where: { id: parseInt(id as string) } }
  );


  const image = result?.file
  const numericalWidth = width ? parseInt(width as string) : 500;

  const resizedImage = await sharp(image)
  .resize(numericalWidth, numericalWidth)
  .jpeg()
  .toBuffer()

  if (result) {
    res.status(200);
    res.setHeader('Content-Disposition','inline');
    res.setHeader('Content-type', result.type);
    res.setHeader('Cache-Control', 'max-age=3600000000000000000');
    res.send(resizedImage);
  }
}
