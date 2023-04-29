import { NextApiRequest, NextApiResponse } from "next";
import { getUserFromAPISession } from "../../../lib/session";
import { checkUser } from "../../../lib/helpers/checkUser";
import { Configuration, OpenAIApi } from "openai";

export type CrystalInfoResponse = {
  crystalInfo?: {
    name: string,
    bio: string
  },
  error?: string
}

export default async function createCrystalInfo(
  req: NextApiRequest,
  res: NextApiResponse<CrystalInfoResponse>
) {
  const user = await getUserFromAPISession(req);

  if (user && checkUser(user)) {
    const { name }: { name: string } = req.body;

    console.log("🐡🐠🐬 name", name);
    

    const openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }));

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {role: "system", content: `You are a knowledgable reiki master and provide descriptions of the properties of crystals. If a user asks you about something that isn't a crystal, simply respond with '{"error": "Not a crystal."}'.`},
        {role: "user", content: `Please describe the crystal '${name}' in about 50 words. Put the description into a field  called 'bio' in a JSON object, and also add 'colors' and 'chakras' properties, both of which are arrays of strings.`}
      ]
    });

    console.log(completion.data);

    const openAIJSON = completion.data.choices[0].message?.content;

    console.log(openAIJSON);
    
    if (openAIJSON) {
      const {bio, chakras, colors, error} = JSON.parse(openAIJSON);
      if (bio) {
        res.status(200).json({crystalInfo: {
          name,
          bio
        }});
      } else {
        res.status(406).json({error});
      }
    }

  } else res.status(401).json({ crystalInfo: undefined, error: "You do not have access to create a crystal info."})
}