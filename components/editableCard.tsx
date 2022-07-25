import { Card } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface EditableCardProps {
    children: React.ReactNode
}

export default function EditableCard({ children }: EditableCardProps) {
    const {data: session} = useSession()
    const [isHovered, setHover] = useState<boolean>(false)
    const [isEditable, setEditable] = useState<boolean>(false)
    
    const handleMouseOver = () => {
        setHover(session?.user.id === 80824142)
    }

    const handleMouseOut = () => {
        setHover(false)
    }

    const handleClickEdit = () => {
        setEditable(session?.user.id === 80824142)
    }

    return (
        <Card variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: '10px' }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {children}
        </Card>
    )
}