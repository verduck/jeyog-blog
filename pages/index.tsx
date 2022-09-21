import { Container, Grid, Card, CardActionArea, Typography } from '@mui/material'
import { styled } from '@mui/system';
import type { NextPage } from 'next'
import Head from 'next/head'

const HomeTitle = styled('h1')({
    display: 'block',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    textAlign: 'center',
    lineHeight: 1.15,
    fontSize: '4rem',
    fontWeight: 'bold'
})

const HomeTitleLink = styled('a')({
    color: '#0070f3',
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline'
    },
    ':focus': {
        textDecoration: 'underline'
    },
    ':active': {
        textDecoration: 'underline'
    }
})

const Description = styled('p')({
    textAlign: 'center',
    margin: '4rem 0',
    lineHeight: 1.5,
    fontSize: '1.5rem'
})

const Code = styled('code')({
    background: '#fafafa',
    color: '#000000',
    borderRadius: '5px',
    padding: '0.75rem',
    fontSize: '1.1rem',
    fontFamily: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace'
})

const CardItems = [
    {
        href: 'https://nextjs.org/docs',
        title: 'Documentation',
        message: 'Find in-depth information about Next.js features and API.'
    },
    {
        href: 'https://nextjs.org/learn',
        title: 'Lean',
        message: 'Learn about Next.js in an interactive course with quizzes!'
    },
    {
        href: 'https://github.com/vercel/next.js/tree/canary/examples',
        title: 'Examples',
        message: 'Discover and deploy boilerplate example Next.js projects.'
    },
    {
        href: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
        title: 'Deploy',
        message: 'Instantly deploy your Next.js site to a public URL with Vercel.'
    }
]

const Home: NextPage = () => {
  return (
    <>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container maxWidth={false}>
            <Grid container alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
                <Grid>
                    <HomeTitle>
                        Welcome to <HomeTitleLink href="https://nextjs.org">Next.js!</HomeTitleLink>
                    </HomeTitle>
                    <Description>
                        Get started by editing{' '}
                        <Code>pages/index.tsx</Code>
                    </Description>
                    <Grid container maxWidth={650} columns={{ xs: 12, sm: 12, md: 12 }}>
                        {CardItems.map((c, index) => (
                            <Grid container key={index} item xs={12} sm={12} md={6} justifyContent="center">
                                <Card variant="outlined" sx={{ margin: '16px', minWidth: '300px', maxWidth: '300px', borderRadius: '10px' }}>
                                    <CardActionArea href={c.href} sx={{ padding: '24px' }}>
                                            <Typography variant="h2" component="div" sx={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                                {c.title} &rarr;
                                            </Typography>
                                            <Typography variant="body2" component="p" sx={{ margin: 0, fontSize: '1.25rem', lineHeight: 1.5 }}>
                                                {c.message}
                                            </Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </>
  )
}

export default Home
