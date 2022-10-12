import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import { findAboutByGithubId, saveAbout } from '@models/abouts'
import nc from 'next-connect'
import authGithub from 'middlewares/apis/authGIthub'
import { About } from '@@types/about'

const secret = process.env.NEXTAUTH_SECRET

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {},
  onNoMatch: (req, res) => {},
})
  .get((req, res) => {
    res.status(200).json({
      message: 'ok',
    })
  })
  .use((req, res, next) => authGithub(req, res, next))
  .post(async (req, res) => {
    const about: About = {
      githubId: req.user?.id,
      ...req.body,
    }
    const response = await saveAbout(about)
    return res.status(200).json(response)
  })

export default handler
