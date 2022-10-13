import { Certificate } from '@@types/certificate'
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
} from '@mui/material'
import withEditing, { WrappedProps } from './withEditing'

interface CertificateCardProps {
  certificates: Certificate[]
}

type Props = WrappedProps & CertificateCardProps

function CertificateCard({
  cardState,
  handleMouseOver,
  handleMouseOut,
  handleClickEdit,
  handleClickConfirm,
  certificates,
}: Props) {
  const handleDeleteCertificate = () => {}

  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', height: '100%', borderRadius: '10px' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardHeader
        title="📝 자격증"
        action={
          cardState.isHovered &&
          (cardState.isEditable ? (
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
          {certificates.map((c) => (
            <Grid key={c.id} item>
              <Chip
                label={c.name}
                deleteIcon={
                  cardState.isEditable ? <CloseIcon></CloseIcon> : <></>
                }
                onDelete={handleDeleteCertificate}
              />
            </Grid>
          ))}
          {cardState.isEditable && (
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

export default withEditing<CertificateCardProps>(CertificateCard)
