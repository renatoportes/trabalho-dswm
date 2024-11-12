import { useState, createContext, useEffect } from 'react';
import { auth } from '../services/auth';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem('@ticketsPRO')
      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false);
      }
      setLoading(false);
    }
    loadUser();
  }, [])

  async function signInWithGoogle() {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (value) => {
        let data = {
          uid: value.user.uid,
          name: value?.user?.displayName?.split(' ')[0],
          avatar: value.user.photoURL,
          email: value.user.email,
        }

        setUser(data);
        storageUser(data);
        setLoading(false);
        navigate("/dashboard")
        toast.success('Bem vindo de volta!')
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.code === 'auth/too-many-requests') {
          toast.error('Muitas tentativas, tente novamente mais tarde!')
          return
        }
        else {
          return toast.error('Algo deu errado, tente novamente!')
        }
      })
  }

  async function signInWithEmail(data) {
    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (value) => {
        const uid = value.user.uid;
        console.log(uid)

        let data = {
          uid: uid,
          name: value.user.email.split('@')[0],
          email: value.user.email,
          avatar: value.user.photoURL,
        }

        setUser(data);
        storageUser(data);
        setLoading(false);
        navigate("/dashboard")
        toast.success('Bem vindo de volta!')
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.code === 'auth/invalid-email') {
          toast.error('Email inválido!')
          return
        }
        if (error.code === 'permission-denied') {
          toast.error('Permissão negada!')
          return
        }
        if (error.code === 'auth/invalid-login-credentials') {
          toast.error('Email ou senha inválidos!')
          return
        }
        if (error.code === 'auth/too-many-requests') {
          toast.error('Muitas tentativas, tente novamente mais tarde!')
          return
        }
      })
  }

  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem('@ticketsPRO');
    setUser(null);
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signInWithEmail,
        logout,
        getUser,
        storageUser,
        loading,
        setUser,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;