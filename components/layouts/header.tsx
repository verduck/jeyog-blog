import React from 'react'
import { AppBar, Toolbar, Button, Typography, IconButton, Avatar, MenuList, MenuItem, Menu } from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Header() {
    const { data: session } = useSession()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Jeyog
                </Typography>
                {session ? (
                    <div>
                        <IconButton onClick={handleMenu}>
                            <Avatar alt="avatar" src={session.user?.image} />
                        </IconButton>   
                        <Menu id="menu-appbar" PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
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
                                right: 24,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            }
                        }} anchorEl={anchorEl} anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }} keepMounted transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <Button color="inherit" onClick={() => signIn()}>로그인</Button>
                     
                )}
            </Toolbar>
        </AppBar>
    )
}