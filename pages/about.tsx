import { Container, Grid } from '@mui/material'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import WithEdit from '../components/withEdit'
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

    return {
        props: {
            about,
            stacks,
            certificates
        },
    }
}

export default function About({ about, stacks, certificates } : InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head>
                <title>소개</title>
            </Head>
            <Container sx={{ paddingY: '24px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <WithEdit>
                            <AboutCard about={about} />
                        </WithEdit>
                    </Grid>
                    <Grid container item spacing={2} xs={12} md={12} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <WithEdit>
                                <StackCard stacks={stacks} />
                            </WithEdit>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <WithEdit>
                                <CertificateCard certificates={certificates} />
                            </WithEdit>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <WithEdit>
                            <TimelineCard />
                        </WithEdit>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}