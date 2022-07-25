import { Card, CardContent, CardHeader, Chip, Grid, IconButton, Rating } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'

interface Stack {
    id: number,
    name: string,
    utilization: number
}

interface CardState {
    isHovered: boolean,
    isEditable: boolean
}

export default function StackCard({ stacks }: { stacks: Stack[] }) {
    const {data: session} = useSession()
    const [cardState, setCardState] = useState<CardState>({ isHovered: false, isEditable: false })

    const handleDelete = () => {
        console.log('clicked the delete button')
    }

    const handleMouseOver = () => {
        setCardState({
            ...cardState,
            isHovered: session?.user.id === 80824142
        })
    }

    const handleMouseOut = () => {
        setCardState({
            ...cardState,
            isHovered: false
        })
    }

    const handleClickEdit = () => {
        setCardState({
            ...cardState,
            isEditable: session?.user.id === 80824142
        })
    }

    const handleClickConfirm = () => {
        setCardState({
            ...cardState,
            isEditable: false
        })
    }

    return (
        <Card variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: '10px' }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <CardHeader
                title="🎖️ 기술스택"
                action={cardState.isHovered && (cardState.isEditable ? (
                    <IconButton onClick={handleClickConfirm}><CheckIcon /></IconButton>
                    ) : (
                    <IconButton onClick={handleClickEdit}><EditIcon /></IconButton>
                ))}
            />
            <CardContent>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                    {stacks.map((s) => (
                        <Grid key={s.id} item>
                            <Chip 
                                label={s.name} 
                                icon={<Rating size="small" value={s.utilization} readOnly={!cardState.isEditable} />}
                                deleteIcon={cardState.isEditable ? <CloseIcon></CloseIcon> : <></>}
                                onDelete={handleDelete} 
                            />
                        </Grid>
                    ))}
                    {cardState.isEditable && <Grid item><IconButton><AddIcon /></IconButton></Grid>}
                </Grid>
            </CardContent>
        </Card>
    )
}