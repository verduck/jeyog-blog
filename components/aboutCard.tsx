import { About } from '@@types/about'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import withEditing, { WrappedProps } from './withEditing'

interface AboutCardProps{
    about: About
 }
 
 type Props = WrappedProps & AboutCardProps

function AboutCard({
    cardState,    
    handleMouseOver,
    handleMouseOut,
    handleClickEdit,
    handleClickConfirm,
    about
} : Props) {
    return (
        <Card variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: '10px' }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <CardHeader
                avatar={
                    <Avatar sx={{ width: '64px', height: '64px' }}>재영</Avatar>
                }
                title={about.name}
                titleTypographyProps={{ variant: 'h5' }}
                subheader={about.job}
                subheaderTypographyProps={{ variant: 'subtitle1' }}
                action={
                    cardState?.isHovered &&
                    (cardState?.isEditable ? (
                        <IconButton onClick={handleClickConfirm}>
                            <CheckIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleClickEdit}><EditIcon /></IconButton>
                    ))
                }
            />
            <CardContent>
                <Typography component="div" variant="body1">{about.introduction}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'end' }}>
                <Link href={about.githubUrl ? about.githubUrl : ''}>
                    <IconButton>
                        <GitHubIcon />
                    </IconButton>
                </Link>
                <Link href={about.instagramUrl ? about.instagramUrl : ''}>
                    <IconButton>
                        <InstagramIcon />
                    </IconButton>
                </Link>
            </CardActions>
        </Card>
    )
}

export default withEditing<AboutCardProps>(AboutCard)