import { Chip, Container, Grid, Link, Typography } from "@mui/material"
import axios from "axios"
import Head from "next/head"
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types"
import { useRef } from "react"
import ViwerWithForwardRef from '../../components/viewer/viewerWIthForwardRef'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const project = {
        id: 1,
        thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
        repoUrl: 'https://github.com/jeyog/WvsApp',
        description: '프로젝트 설명',
        stacks: ['Java', 'MySQL'],
        name: '프로젝트1'
    }

    const rawReadmeUrl = project.repoUrl.replace('github.com', 'raw.githubusercontent.com').concat('/master/README.md')
    const res = await axios.get(rawReadmeUrl)
    const content = res.data

    return {
        props: {
            project,
            content
        }
    }
}

export default function Project({ project, content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const viewerRef = useRef<HTMLDivElement>(null)

    const options = {
        initialValue: content
    }

    return (
        <>
            <Head>
                <title>{project.name}</title>
            </Head>
            <Container sx={{ paddingY: '24px', bgcolor: 'background.default' }}>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>{project.name}</Typography>
                <p>{project.description}</p>
                <Grid direction="row" container marginY={1}>
                    {project.stacks.map((s: string) => (
                        <Chip key={s} label={s} size="small" />
                    ))}
                </Grid>
                <Link href={project.repoUrl} underline="hover">소스 코드</Link>
                <ViwerWithForwardRef ref={viewerRef} options={options} />
            </Container>
        </>
    )
}
