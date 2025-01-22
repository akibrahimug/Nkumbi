import client from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = client.db("sample_mflix");
    const comments = await db
      .collection("comments")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
    res.json(comments);
  } catch (e) {
    console.error(e);
  }
};
