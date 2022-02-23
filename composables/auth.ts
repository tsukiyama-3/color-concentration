import firebase from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

export const useAuth = () => {
  const user = ref()
  const loginWithGoogle = async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const result: any = await signInWithPopup(auth, provider).catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(error, credential)
    })
    const credential = result != null ? await GoogleAuthProvider.credentialFromResult(result) : null
    if (result != null && credential != null) {
      console.log(result, credential)
    }
    user.value = result.user
  }

  return {
    loginWithGoogle,
    user
  }
}