import axios from 'axios';

export const login = async () => {
    const url = "https://apertum-interview.herokuapp.com/api/user/login";
    let response = {
        data: null,
        message: null,
    };

    try {
        const response = await axios.post(url, {
            accountId: 'admin',
            pswd: '123456'
          })
        console.log("login -> response", response)
        const jwt = await response.data;
        console.log({jwt});
        const token = jwt.token;
        console.log('jwt',jwt);
        response.jwt = jwt;
        response.message = jwt.message;
        
    } catch (error) {
        console.log('error: ', error);
    }
    getLoginStatus();
};

export const getLoginStatus = (jwt) => {
    if(jwt){
        return true;
    } else {
        return false;
    }
}