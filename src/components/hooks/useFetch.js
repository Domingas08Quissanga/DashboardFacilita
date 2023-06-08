import useSWR from 'swr';
import { api } from '../../services';

function useFetch(url) {
    const { data, error } = useSWR(url, async url => {
        const response = await api.get(url);
        return response.data;
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
}

export { useFetch };
