import { useSession } from 'next-auth/react'
import React from 'react'
import { useState } from 'react'
import { CardState } from '../types/cardState'

interface Props {
    children: React.ReactElement
}

export default function WithEdit({ children }: Props) {
    const {data: session} = useSession()
    const [cardState, setCardState] = useState<CardState>({
        isHovered: false,
        isEditable: false
    });
    
    const handleMouseOver = () => {
        setCardState({
          ...cardState,
          isHovered: session?.user.id === 80824142
        });
    };
    
    const handleMouseOut = () => {
        setCardState({
          ...cardState,
          isHovered: false
        });
    };
    
    const handleClickEdit = () => {
        setCardState({
          ...cardState,
          isEditable: session?.user.id === 80824142
        });
    };
    
    const handleClickConfirm = () => {
        setCardState({
          ...cardState,
          isEditable: false
        });
    };

    const attachedProps = {
        cardState,
        handleMouseOver,
        handleMouseOut,
        handleClickEdit,
        handleClickConfirm
    }

    const attachedComponent = React.cloneElement(children, { ...attachedProps })

    return attachedComponent
}