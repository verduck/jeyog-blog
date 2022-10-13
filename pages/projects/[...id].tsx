import ViwerWithForwardRef from '@components/viewer/viewerWIthForwardRef'
import {
  Chip,
  Container,
  Grid,
  Link,
  Typography,
  useTheme,
} from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { useRef } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const project = {
    id: 1,
    thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
    repoUrl: 'https://github.com/jeyog/WvsApp',
    branch: 'master',
    description: '프로젝트 설명',
    stacks: ['Java', 'MySQL'],
    name: '프로젝트1',
  }
  const rawBaseUrl = project.repoUrl
    .replace('github.com', 'raw.githubusercontent.com')
    .concat(`/${project.branch}`)
  const readmeUrl = rawBaseUrl.concat('/README.md')
  const res = await axios.get(readmeUrl)
  const content = res.data.replaceAll(/]\((?!http)/g, `](${rawBaseUrl}/`)

  return {
    props: {
      project,
      content,
    },
  }
}

export default function Project({
  project,
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const theme = useTheme()
  const viewerRef = useRef<HTMLDivElement>(null)

  const options = {
    initialValue: content,
    theme: theme.palette.mode,
  }

  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>
      <Container sx={{ paddingY: '24px', bgcolor: 'background.default' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          {project.name}
        </Typography>
        <p>{project.description}</p>
        <Grid direction="row" container marginY={1}>
          {project.stacks.map((s: string) => (
            <Chip key={s} label={s} size="small" />
          ))}
        </Grid>
        <Link href={project.repoUrl} underline="hover">
          소스 코드
        </Link>
        <ViwerWithForwardRef
          key={options.theme}
          ref={viewerRef}
          options={options}
        />
      </Container>
    </>
  )
}
