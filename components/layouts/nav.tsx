import React from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import Link from 'next/link'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useRouter } from 'next/router'

const drawerWidth = 240

interface DrawerToggleProps {
    open?: boolean
}

const openedMinxin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
})
  
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`
    }
})
  
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMinxin(theme),
        '& .MuiDrawer-paper': openedMinxin(theme)
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
        })
    })
)

const DrawerToggle = styled(ChevronRightIcon, { shouldForwardProp: (prop) => prop !== 'open' })<DrawerToggleProps>(
    ({ theme, open }) => ({
        ...(open && {
            transform: 'rotate(180deg)',
            transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard
            }),
        }),
        ...(!open&& {
            transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard
            }),
        })
    })
)

const navItems = [
    {
        icon: <AssignmentIndIcon />,
        name: '소개',
        href: '/about'
    },
    {
        icon: <DeveloperBoardIcon />,
        name: '프로젝트',
        href: '/projects'
    },
    {
        icon: <IntegrationInstructionsIcon />,
        name: '개발',
        href: '/develop'
    }
]

export default function Nav() {
    const router = useRouter()
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)

    const handleToggleDrawer = () => {
        setDrawerOpen((prev) => !prev)
    }

    return (
        <Drawer variant="permanent" open={drawerOpen}>
            <Toolbar />
            <Box sx={{ flexGrow: 1 }}>
                <List style={{ color: 'inherit' }}>
                    <ListItemButton onClick={handleToggleDrawer}>
                    <Box sx={{ flexGrow: 1 }} />
                        <DrawerToggle open={drawerOpen} />
                    </ListItemButton>
                    {navItems.map((l, index: number) => (
                        <Link key={index} href={l.href}>
                            <ListItemButton selected={router.pathname === l.href}>
                                <ListItemIcon>
                                    {l.icon}
                                </ListItemIcon>
                                <ListItemText primary={l.name} />
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            </Box>
            <Box padding={1}>
                <Link href="https://github.com/jeyog">
                    <IconButton color="inherit">
                        <GitHubIcon />
                    </IconButton>
                </Link>
            </Box>
        </Drawer>
    )
}