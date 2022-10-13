import { findAboutByGithubId } from '@models/abouts'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {},
  onNoMatch: (req, res) => {},
}).get(async (req, res) => {
  const { githubId } = req.query
  const about = await findAboutByGithubId(Number(githubId))
  res.status(200).json(about)
})

export default handler
