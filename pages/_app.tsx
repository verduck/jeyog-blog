import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider  } from 'next-auth/react'
import Layout from '../components/layouts/layout'
import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
      [mode]
  )

  return (
    <SessionProvider session={pageProps.session}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SessionProvider>
  )
}

export default MyApp
