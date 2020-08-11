import axios from 'axios';

export const login = async (accountId,pswd) => {
    const url = "https://apertum-interview.herokuapp.com/api/user/login";
    let result = {
        jwt: null,
        message: null,
    };

    try {
        const response = await axios.post(url, {
            accountId,
            pswd,
          })
        const data = await response.data;
        result.jwt = data.token;
        result.message = data.message;        
    } catch (error) {
        console.log('error: ', error);
        result.jwt = null;
        result.message = error;
    }
   return getLoginStatus(result);
};

export const getLoginStatus = ({jwt, message}) => {
    if(jwt){
        sessionStorage.setItem("token", jwt);
        return {
            status: true,
            message,
            jwt,
        };
    } else {
        return {
            status: false,
            error:message,
        };
    }
}

export const getUserList = async (jwt) => {
    const url = "https://apertum-interview.herokuapp.com/api/users";
    const options = {
        headers: {'Authorization': `Bearer ${jwt}`}
    };
    try {
        const response = await axios.get(url, options);
        const data = await response.data;   
        return {
            users:data,
            error: '',
        }
    } catch (error) {
        console.log('error: ', error);
        return {
            users:[],
            error,
        }
    } 
}