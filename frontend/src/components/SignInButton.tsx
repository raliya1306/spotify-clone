import { useSignIn } from '@clerk/clerk-react'
import { Button } from './ui/button'

const SignInAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn()

  if(!isLoaded) {
    return null
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/auth-callback'
    })
  }

  return (
    <Button onClick={signInWithGoogle} className='w-full h-11 rounded-full px-6 font-bold'>
      Log in
    </Button>
  )
}

export default SignInAuthButtons