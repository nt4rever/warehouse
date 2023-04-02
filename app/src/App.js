// project import
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/Snackbar/index';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
                <Snackbar />
            </ScrollTop>
        </ThemeCustomization>
    </QueryClientProvider>
);

export default App;
