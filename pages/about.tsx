import { Container, Grid } from '@mui/material'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import AboutCard from '../components/aboutCard'
import CertificateCard from '../components/certificateCard'
import StackCard from '../components/stackCard'
import TimelineCard from '../components/timelineCard'


export const getServerSideProps: GetServerSideProps = async (context) => {
    const about = {
        id: 80824142,
        name: '최재영',
        job: 'Back-End Engineer',
        introduction: '간단 소개',
        githubUrl: 'https://github.com/jeyog'
    }

    const stacks = [
        {
            id: 1,
            name: 'Java',
            utilization: 4
        },
        {
            id: 2,
            name: 'Spring Boot',
            utilization: 4
        }
    ]

    const certificates = [
        {
            id: 1,
            name: '컴퓨터활용능력1급',
            acquisitionDate: '2021-01-29'
        },
        {
            id: 2,
            name: '정보처리기사',
            acquisitionDate: '2021-06-02'
        },
        {
            id: 3,
            name: '리눅스마스터2급',
            acquisitionDate: '2021-12-31'
        }
    ]

    const timelines = [
        {
            id: 1,
            title: '전주대학교',
            icon: 'school',
            content: '컴퓨터공학과 전공\n3.83 / 4.5 학점',
            timestamp: '2016-02-29 ~ 2022-02-15'
        },
        {
            id: 2,
            title: '(주) 텔로스',
            icon: 'business',
            content: '메타버스 API 플랫폼 개발',
            timestamp: '2022-04-11 ~'
        }
    ]

    return {
        props: {
            about,
            stacks,
            certificates,
            timelines
        },
    }
}

export default function About({ about, stacks, certificates, timelines } : InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <title>소개</title>
            </Head>
            <Container sx={{ paddingY: '24px', bgcolor: 'background.default' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AboutCard about={about} />
                    </Grid>
                    <Grid container item spacing={2} xs={12} md={12} alignItems="center" justifyContent="center">
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