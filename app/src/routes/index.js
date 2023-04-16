import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
    return useRoutes(AppRoutes(isLoggedIn, currentUser));
}
