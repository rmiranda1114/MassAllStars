import axios from '../api/axios.js';
import useUser from './useUser.js';


    const useRefreshToken = () => {
        const { setUser } = useUser();

        const refresh = async () => {
            const response = await axios.post('/api/refresh', 
                JSON.stringify({
                    refresh: sessionStorage.getItem('JWT')
                }),
                {
                
                withCredentials: true, // Needed to included cookie
                headers: { 'Content-type': 'application/json' }
                
            });
            sessionStorage.removeItem('JWT');
            sessionStorage.setItem('JWT', response.data.refreshToken);
            setUser(prev => {
                return { ...prev, accesstoken: response.data.accessToken}
            });
            return response.data.accessToken;
        }
        return refresh;
    }

    export default useRefreshToken;
   

 