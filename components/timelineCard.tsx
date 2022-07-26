import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import { CardState } from '../types/cardState'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

interface Props {
    cardState?: CardState
    handleMouseOver?: () => void
    handleMouseOut?: () => void
    handleClickEdit?: () => void
    handleClickConfirm?: () => void
}

export default function TimelineCard({
    cardState,
    handleMouseOver,
    handleMouseOut,
    handleClickEdit,
    handleClickConfirm
}: Props) {
    return (
        <Card variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: '10px' }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <CardHeader
                title="⏳ 타임라인"
                action={cardState?.isHovered && (cardState?.isEditable ? (
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
                
            </CardContent>
        </Card>
    )
}