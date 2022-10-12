import { About } from '@@types/about'
import knex from '@config/databaseConfig'

const findAboutByGithubId = async (githubId: number) => {
  return await knex<About>('abouts').where('githubId', githubId).first()
}

const saveAbout = async (about: About) => {
  let result: number
  if (about.id) {
    result = await knex<About>('abouts').where({ id: about.id }).update(about)
  } else {
    result = (await knex<About>('abouts').insert(about))[0]
  }
  const newAbout: About = {
    ...about,
    id: result,
  }

  return newAbout
}

export { findAboutByGithubId, saveAbout }
