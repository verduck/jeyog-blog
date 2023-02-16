import { Toolbar } from '@mui/material'
import Footer from './footer'
import Header from './header'
import Nav from './nav'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Nav />
      <Toolbar />
      {children}
      <Footer />
    </>
  )
}
