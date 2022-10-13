import { Timeline as TimelineType } from '@@types/timeline'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'
import {
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Typography,
} from '@mui/material'
import withEditing, { WrappedProps } from './withEditing'

interface TimelineCardProps {
  timelines: TimelineType[]
}

type Props = WrappedProps & TimelineCardProps

function TimelineCard({
  cardState,
  handleMouseOver,
  handleMouseOut,
  handleClickEdit,
  handleClickConfirm,
  timelines,
}: Props) {
  const stringToColor = (v: string) => {
    let hash = 0

    for (let i = 0; i < v.length; i++) {
      hash = v.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = '#'

    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 6)) & 0xff
      color += `00${value.toString(16)}`.substring(2)
    }
    return color
  }

  const timeDotColor = (title: string) => {
    return {
      sx: {
        backgroundColor: stringToColor(title),
      },
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', height: '100%', borderRadius: '10px' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardHeader
        title="⏳ 타임라인"
        action={
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
      />
      <CardContent>
        <Timeline position="alternate">
          {timelines.map((t, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="subtitle2"
                color="text.secondary"
              >
                {`${t.startAt} ~ ` + (t.endAt && t.endAt)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot {...timeDotColor(t.title)}>
                  <Icon>{t.icon}</Icon>
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h5" component="span">
                  {t.title}
                </Typography>
                <Typography>{t.content}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default withEditing<TimelineCardProps>(TimelineCard)
