import { styled } from '@mui/material/styles'

interface MenuIconProps {
  open: boolean
}

const Wrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<MenuIconProps>(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '32px',
  margin: '4px',
  span: {
    backgroundColor: 'white',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.standard,
    }),
    ...(open && {
      ':nth-child(1)': {
        transform: 'rotate(45deg)',
        width: '113%',
      },
      ':nth-child(2)': {
        transform: 'scale(0.1)',
      },
      ':nth-child(3)': {
        transform: 'rotate(-45deg)',
        width: '113%',
      },
    }),
  },
}))

const Stick = styled('span')(({ theme }) => ({
  borderRadius: '4px',
  width: '100%',
  marginY: '1px',
  height: '3px',
  '& + &': {
    marginTop: '6px',
  },
  ':nth-child(1)': {
    transformOrigin: '-1px 10px',
  },
  ':nth-child(2)': {
    transformOrigin: '50% 50%',
  },
  ':nth-child(3)': {
    transformOrigin: '10px 0px',
  },
}))

const MenuIcon = ({ open }: MenuIconProps) => {
  return (
    <Wrapper open={open}>
      <Stick />
      <Stick />
      <Stick />
    </Wrapper>
  )
}

export default MenuIcon
