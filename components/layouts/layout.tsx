import { ReactNode } from 'react'
import Header from './header'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}