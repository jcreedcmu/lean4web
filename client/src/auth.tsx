import { useContext, createContext, useEffect, useState } from 'react'

type AuthContext = {
  user: any,
  setUser: (user: any) => void,
  loading: boolean,
  doLogin: () => void,
  doDebug: () => void,
}

const authContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function doFetchProfile() {
    setLoading(true);
    console.log('doDebug');
    const res = await fetch("http://localhost:3000/profile.json", {
      credentials: 'include',
    });

    // FIXME: error handling?
    const json = await res.json();
    setUser(json.user);
    setLoading(false);
  }

  useEffect(() => {
    doFetchProfile();
    // FIXME: cancellation?
  }, []);

  async function doLogin() {
    console.log('doLogin');
    window.location.href = `http://localhost:3000/auth/github`;
  }

  return (
    <authContext.Provider value={{ user, setUser, loading, doDebug: doFetchProfile, doLogin }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
