import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {},
  onNoMatch: (req, res) => {},
}).get((req, res) => {
  res.status(200).json({
    message: 'ok',
  })
})

export default handler
