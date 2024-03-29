import { TechStack } from '@@types/techStack'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Rating,
} from '@mui/material'
import withEditing, { WrappedProps } from './withEditing'

interface StackCardProps {
  stacks: TechStack[]
}

type Props = WrappedProps & StackCardProps

function StackCard({
  cardState,
  handleMouseOver,
  handleMouseOut,
  handleClickEdit,
  handleClickConfirm,
  stacks,
}: Props) {
  const handleDeleteStack = () => {}

  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', height: '100%', borderRadius: '10px' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardHeader
        title="🎖️ 기술스택"
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
        <Grid container spacing={1} alignItems="center">
          {stacks.map((s) => (
            <Grid key={s.id} item>
              <Chip
                label={s.name}
                icon={
                  <Rating
                    size="small"
                    value={s.utilization}
                    readOnly={!cardState?.isEditable}
                  />
                }
                deleteIcon={
                  cardState?.isEditable ? <CloseIcon fontSize="small" /> : <></>
                }
                onDelete={handleDeleteStack}
              />
            </Grid>
          ))}
          {cardState?.isEditable && (
            <Grid item>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default withEditing<StackCardProps>(StackCard)
