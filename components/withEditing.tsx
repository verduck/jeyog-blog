import { CardState } from '@@types/cardState'
import React, { useState } from 'react'
import useAuth from '../hooks/useAUth'

export interface WrappedProps {
  cardState: CardState
  handleMouseOver: () => void
  handleMouseOut: () => void
  handleClickEdit: () => void
  handleClickConfirm: () => void
}

const withEditing = <S,>(
  WrappedComponent: React.ComponentType<WrappedProps & S>
) => {
  const EditableComponent = (props: S) => {
    const { isAdmin } = useAuth()
    const [cardState, setCardState] = useState<CardState>({
      isHovered: false,
      isEditable: false,
    })

    const handleMouseOver = () => {
      setCardState({
        ...cardState,
        isHovered: isAdmin(),
      })
    }

    const handleMouseOut = () => {
      setCardState({
        ...cardState,
        isHovered: false,
      })
    }

    const handleClickEdit = () => {
      setCardState({
        ...cardState,
        isEditable: isAdmin(),
      })
    }

    const handleClickConfirm = () => {
      setCardState({
        ...cardState,
        isEditable: false,
      })
    }

    const attachedProps = {
      cardState,
      handleMouseOver,
      handleMouseOut,
      handleClickEdit,
      handleClickConfirm,
      ...props,
    }

    return <WrappedComponent {...attachedProps} />
  }

  EditableComponent.displayName = 'EditableComponent'

  return EditableComponent
}

export default withEditing
