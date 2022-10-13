import { About } from '@@types/about'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import withEditing, { WrappedProps } from './withEditing'

interface AboutCardProps {
  about?: About
}

type Props = WrappedProps & AboutCardProps

function AboutCard({
  cardState,
  handleMouseOver,
  handleMouseOut,
  handleClickEdit,
  handleClickConfirm,
  about,
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', height: '100%', borderRadius: '10px' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardHeader
        avatar={
          about ? (
            <Avatar sx={{ width: '64px', height: '64px' }}>
              {about.name.substring(1)}
            </Avatar>
          ) : (
            <Skeleton variant="circular" width="64px" height="64px" />
          )
        }
        title={about ? about.name : <Skeleton width={120} height={32} />}
        titleTypographyProps={{ variant: 'h5' }}
        subheader={about ? about.job : <Skeleton width={200} height={27} />}
        subheaderTypographyProps={{ variant: 'subtitle1' }}
        action={
          about &&
          cardState?.isHovered &&
          (cardState?.isEditable ? (
            <IconButton onClick={handleClickConfirm}>
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleClickEdit}>
              <EditIcon />
            </IconButton>
          ))
        }
      ></CardHeader>
      <CardContent>
        <Typography component="div" variant="body1">
          {about ? (
            about.introduction
          ) : (
            <>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" width="70%" />
            </>
          )}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        {about && about.githubUrl && (
          <Link href={about.githubUrl}>
            <IconButton>
              <GitHubIcon />
            </IconButton>
          </Link>
        )}
        {about && about.instagramUrl && (
          <Link href={about?.instagramUrl ? about.instagramUrl : ''}>
            <IconButton>
              <InstagramIcon />
            </IconButton>
          </Link>
        )}
      </CardActions>
    </Card>
  )
}

export default withEditing<AboutCardProps>(AboutCard)
