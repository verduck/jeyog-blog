import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

const authGithub = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const headers = req.headers
  const bearerToken = headers['authorization']
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        authorization: bearerToken as string,
      },
    })
    req.user = response.data
    next()
  } catch (err) {
    res.status(401).json({ message: 'unauthorized' })
  }
}

export default authGithub
