import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface Page {
  name: string
  link: string
}

interface NavBarProps {
  pages: Page[]
}

const NavBar = ({ pages }: NavBarProps): React.ReactElement => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
      {pages.map(({ name, link }) => (
        <Button key={name} color="inherit">
          <Link href={link}>{name}</Link>
        </Button>
      ))}
    </Box>
  )
}

const AuthInfo = (): React.ReactElement => {
  const { data: session, status } = useSession()
  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggleMenu = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu)
  }

  const handleCloseMenu = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpenMenu(false)
  }

  const prevOpenMenu = React.useRef(openMenu)
  React.useEffect(() => {
    if (prevOpenMenu.current && !openMenu) {
      anchorRef.current!.focus()
    }

    prevOpenMenu.current = openMenu
  }, [openMenu])

  return (
    <>
      {status === 'loading' ? (
        <></>
      ) : session ? (
        <>
          <IconButton
            ref={anchorRef}
            aria-controls={openMenu ? 'profile-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggleMenu}
            size="small"
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <Avatar alt="avatar" src={session.user?.image as string} />
          </IconButton>
          <Popper
            open={openMenu}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left bottom' : 'right top',
                }}
              >
                <Paper
                  sx={{
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 0.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 20.5,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  }}
                >
                  <ClickAwayListener onClickAway={handleCloseMenu}>
                    <MenuList autoFocusItem={openMenu} id="profile-menu">
                      <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      ) : (
        <Button color="inherit" onClick={() => signIn('github')}>
          로그인
        </Button>
      )}
    </>
  )
}

export default function Header() {
  const pages = [
    { name: '소개', link: '/about' },
    { name: '프로젝트', link: '/projects' },
    { name: '개발', link: '/develop' },
  ]

  return (
    <AppBar elevation={1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" component="div">
            Jyclog
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <NavBar pages={pages} />
        <AuthInfo />
        <IconButton
          color="inherit"
          sx={{ display: { xs: 'flex', sm: 'none', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
