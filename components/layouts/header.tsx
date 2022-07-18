import React from 'react'
import { AppBar, Toolbar, Button, Typography, IconButton, Avatar, MenuList, MenuItem, Popper, ClickAwayListener, Paper, Grow } from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Header() {
    const { data: session, status } = useSession()
    const [openMenu, setOpenMenu] = React.useState<boolean>(false)
    const anchorRef = React.useRef<HTMLButtonElement>(null)

    const handleToggleMenu = () => {
        setOpenMenu((prevOpenMenu) => !prevOpenMenu)
    }
    
    const handleCloseMenu = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
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
        <AppBar color="inherit" elevation={1}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Jylog
                </Typography>
                {status === 'loading' ? (
                    <></>
                ) : (session ? (
                    <>
                        <IconButton ref={anchorRef} aria-controls={openMenu ? 'profile-menu' : undefined} aria-expanded={openMenu ? 'true' : undefined} aria-haspopup="true" onClick={handleToggleMenu} size="small">
                            <Avatar alt="avatar" src={session.user?.image as string} />
                        </IconButton>   
                        <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
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
                                    }}>
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
                    <Button color="inherit" onClick={() => signIn('github')}>로그인</Button> 
                ))
                }
            </Toolbar>
        </AppBar>
    )
}