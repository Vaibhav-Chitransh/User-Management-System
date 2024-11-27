import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, currentUser}) => {
    if(!currentUser) return <Navigate to='/' />
    return children;
};

export default ProtectedRoute;