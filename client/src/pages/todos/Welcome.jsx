import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/signin');
    }
  }, [])
  return (
    <div className='text-3xl font-semibold flex items-center max-w-md mx-auto text-center h-full'>
      <div>
        Welcome to <span className='text-yellow-400'>Todoblocks</span> a MERN based Todo app
      </div>
    </div>
  )
}

export default Welcome