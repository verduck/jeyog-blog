import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard'
import GitHubIcon from '@mui/icons-material/GitHub'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import ColorModeContext from '../../contexts/colorModeContext'

const drawerWidth = '100%'
const drawerHeight = '100%'

export interface DrawerProps {
  open?: boolean
}

const openedMinxin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('height', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('height', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'hidden',
  height: 0,
})

const appearAnimation = (): CSSObject => ({
  animation: 'appear .3s',
  '@keyframes appear': {
    '0%': {
      transform: 'scale(0) rotate(-180deg)',
    },
    '100%': {
      transform: 'scale(1) rotate(0deg)',
    },
  },
})

const Drawer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  height: drawerHeight,
  zIndex: theme.zIndex.drawer,
  position: 'fixed',
  flexShrink: 0,
  right: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backdropFilter: 'blur(8px);',
  backgroundColor: 'rgba(255, 255, 255, 0.8);',
  ...(open && {
    ...openedMinxin(theme),
    '& .MuiDrawer-paper': openedMinxin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const DrawerMenuIcon = styled(MenuIcon)(() => ({
  ...appearAnimation(),
}))

const DrawerCloseIcon = styled(CloseIcon)(() => ({
  ...appearAnimation(),
}))

const navItems = [
  {
    icon: <AssignmentIndIcon />,
    name: '소개',
    href: '/about',
  },
  {
    icon: <DeveloperBoardIcon />,
    name: '프로젝트',
    href: '/projects',
  },
  {
    icon: <IntegrationInstructionsIcon />,
    name: '개발',
    href: '/develop',
  },
]

export default function Nav() {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)

  const handleToggleDrawer = () => {
    setDrawerOpen((prev) => !prev)
  }

  return (
    <>
      {/* <div style={{ position: 'relative' }}> */}
      <IconButton
        onClick={handleToggleDrawer}
        sx={{
          display: {
            xs: 'flex',
            sm: drawerOpen ? 'flex' : 'none',
            md: drawerOpen ? 'flex' : 'none',
          },
          position: 'absolute',
          zIndex: theme.zIndex.drawer + 1,
          right: 16,
          top: 8,
          color: drawerOpen ? 'gray' : 'white',
          transition: theme.transitions.create('color', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        {drawerOpen ? <DrawerCloseIcon /> : <DrawerMenuIcon />}
      </IconButton>
      <Drawer open={drawerOpen}>
        <Toolbar />
        <Box sx={{ flexGrow: 1 }}>
          <List style={{ color: 'inherit' }}>
            {navItems.map((l, index: number) => (
              <Link key={index} href={l.href}>
                <Tooltip title={l.name} placement="right-end">
                  <ListItemButton selected={router.pathname.startsWith(l.href)}>
                    <ListItemIcon>{l.icon}</ListItemIcon>
                    <ListItemText primary={l.name} />
                  </ListItemButton>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Box>
        <Box marginX={1}>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
        <Box margin={1}>
          <Link href="https://github.com/jeyog">
            <IconButton color="inherit">
              <GitHubIcon />
            </IconButton>
          </Link>
        </Box>
      </Drawer>
    </>
  )
}
