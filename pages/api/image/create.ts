import prisma from "../../../lib/prisma";
import {promises as fs} from "fs"

import { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File } from 'formidable'

//set bodyparser
export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable()

    form.parse(req, async (err, fields, files) => {
      if (err) throw({ err })

      const image = await prisma.image.create({
        data: {
          file: await fs.readFile((files.file as File).filepath),
          name: fields.name as string,
          type: fields.type as string
        }
      })

      res.status(200).json({
        status: 'ok',
        imageId: image.id
      })
    })

  //return the data back or just do whatever you want with it
  
}