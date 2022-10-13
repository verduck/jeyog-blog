import { api } from '@api/index'
import AboutCard from '@components/aboutCard'
import CertificateCard from '@components/certificateCard'
import StackCard from '@components/stackCard'
import TimelineCard from '@components/timelineCard'
import { Container, Grid } from '@mui/material'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

const adminGithubId = 80824142

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.fetchQuery(['abouts', adminGithubId], () =>
    api.aboutService.getAboutByGithubId(adminGithubId)
  )

  const stacks = [
    {
      id: 1,
      name: 'Java',
      utilization: 4,
    },
    {
      id: 2,
      name: 'Spring Boot',
      utilization: 4,
    },
  ]

  const certificates = [
    {
      id: 1,
      name: '컴퓨터활용능력1급',
      acquisitionDate: '2021-01-29',
    },
    {
      id: 2,
      name: '정보처리기사',
      acquisitionDate: '2021-06-02',
    },
    {
      id: 3,
      name: '리눅스마스터2급',
      acquisitionDate: '2021-12-31',
    },
  ]

  const timelines = [
    {
      id: 1,
      title: '전주대학교',
      icon: 'school',
      content: '컴퓨터공학과 전공\n3.83 / 4.5 학점',
      timestamp: '2016-02-29 ~ 2022-02-15',
    },
    {
      id: 2,
      title: '(주) 텔로스',
      icon: 'business',
      content: '메타버스 API 플랫폼 개발',
      timestamp: '2022-04-11 ~',
    },
  ]

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      stacks,
      certificates,
      timelines,
    },
  }
}

function About({
  stacks,
  certificates,
  timelines,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: about } = useQuery(['abouts', adminGithubId], () =>
    api.aboutService.getAboutByGithubId(adminGithubId)
  )

  return (
    <>
      <Head>
        <title>소개</title>
      </Head>
      <Container
        sx={{
          paddingY: '24px',
          bgcolor: 'background.default',
          minHeight: '88.57vh',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AboutCard about={about} />
          </Grid>
          <Grid
            container
            item
            spacing={2}
            xs={12}
            md={12}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={6}>
              <StackCard stacks={stacks} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CertificateCard certificates={certificates} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TimelineCard timelines={timelines} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default About
