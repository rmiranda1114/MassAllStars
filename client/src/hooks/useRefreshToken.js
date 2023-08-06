import axios from '../api/axios.js';
import useUser from './useUser.js';


const useRefreshToken = () => {
    const { setUser } = useUser();

    const refresh = async () => {
        const response = await axios.post('/api/refresh', {}, {
            withCredentials: true
        });
        setUser(prev => {
            return { ...prev, accesstoken: response.data.accessToken}
        });
        return response.data.accessToken;
    }
return refresh;
}


export default useRefreshToken;
   

 