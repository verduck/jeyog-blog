import { useSession } from 'next-auth/react'

function useAuth() {
  const { data: session } = useSession()

  const isAdmin = () => {
    return session?.user.id === 80824142
  }

  return {
    isAdmin,
  }
}

export default useAuth
