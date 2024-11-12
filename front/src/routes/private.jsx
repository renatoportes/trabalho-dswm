import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth';

export default function Private({ children }) {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <div></div>
    )
  }

  if (user == true) {
    return <Navigate to="/dashboard" />
  }

  if (!signed || !user.email || !user) {
    return <Navigate to="/" />
  }


  return children;

}