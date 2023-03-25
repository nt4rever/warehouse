import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return useRoutes(AppRoutes(isLoggedIn));
}
