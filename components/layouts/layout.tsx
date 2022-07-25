import { Box, Toolbar } from '@mui/material'
import Footer from './footer'
import Header from './header'
import Nav from './nav'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <>
            <Header />
            <Box sx={{ display: 'flex'}}>
                <Nav />
                <Box component="main" sx={{ flexGrow: 1}}>
                    <Toolbar />
                    {children}
                    <Footer />
                </Box>
            </Box>
            
        </>
    )
}