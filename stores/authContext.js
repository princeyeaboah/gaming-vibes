import { createContext, useState, useEffect } from "react";
import netlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({
  user: null,
  login: () => { },
  logout: () => { },
  authReady: false
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    //close signup/login modal on login
    netlifyIdentity.on('login', (user) => {
      setUser(user)
      netlifyIdentity.close()
      console.log('login event')
    })

    netlifyIdentity.on('logout', () => {
      setUser(null)
      console.log('logout event')
    })

    netlifyIdentity.on('init', (user) => {
      setUser(user)
      setAuthReady(true)
      console.log('netlify successfully init')
    })

    //init netlify identity connection
    netlifyIdentity.init()

    return () => {
      netlifyIdentity.off('login')
      netlifyIdentity.off('login')
    }
  }, [])

  const login = () => {
    netlifyIdentity.open()
  }

  const logout = () => {
    netlifyIdentity.logout()
  }

  const context = {
    user,
    login,
    logout,
    authReady
  }
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext