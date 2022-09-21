import { Container, Fab, Grid } from '@mui/material'
import Head from 'next/head'
import AddIcon from '@mui/icons-material/Add'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ProjectCard from '../components/projectCard'
import { Project } from '../types/project'
import { useSession } from 'next-auth/react'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const projects = [
        {
            id: 1,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트1'
        },
        {
            id: 2,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트2'
        },
        {
            id: 3,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트3'
        },
        {
            id: 4,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트4'
        },
        {
            id: 5,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트5'
        },
        {
            id: 6,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트6'
        },
        {
            id: 7,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트7'
        },
        {
            id: 8,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트8'
        },
        {
            id: 9,
            thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
            name: '프로젝트9'
        }
    ]

    return {
        props: {
            projects
        },
    }
}

export default function Projects({ projects } : InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {data: session} = useSession()

    return (
        <>
            <Head>
                <title>프로젝트</title>
            </Head>
            <Container sx={{ paddingY: '24px', bgcolor: 'background.default' }}>
                <Grid container spacing={2} alignItems="center">
                    {projects.map((p: Project) => (
                        <Grid key={p.id} item xs={12} sm={6} md={3}>
                            <ProjectCard project={p} />
                        </Grid>
                    ))}
                    {session?.user.id == 80824142 &&
                        <Grid container item xs={12} sm={6} md={3} justifyContent="center">
                            <Fab aria-label="add">
                                <AddIcon color="inherit" />
                            </Fab>
                        </Grid>
                    }
                </Grid>
            </Container>
        </>
    )
}