// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2001,
    width: '100%',
    '& > * + *': {
        marginTop: theme.spacing(2)
    }
}));

// ==============================|| Loader ||============================== //

const Loading = () => {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    if (isFetching + isMutating === 0) return null;
    return (
        <LoaderWrapper>
            <LinearProgress color="primary" />
        </LoaderWrapper>
    );
};

export default Loading;
