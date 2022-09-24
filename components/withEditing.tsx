import React from "react"
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { CardState } from '../types/cardState'

export interface WrappedProps {
    cardState: CardState
    handleMouseOver: () => void
    handleMouseOut: () => void
    handleClickEdit: () => void
    handleClickConfirm: () => void
}

const withEditing = <S,>(WrappedComponent: React.ComponentType<WrappedProps & S>) => {
    const EditableComponent = (props: S) => {
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
            handleClickConfirm,
            ...props
        }

        return <WrappedComponent {...attachedProps}/>
    }

    EditableComponent.displayName = 'EditableComponent'

    return EditableComponent
}

export default withEditing