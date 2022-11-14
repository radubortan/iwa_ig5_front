import axios from 'axios';

export default {
    loginUser: (email, password) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/login',
                header: {},
                data: {
                    email: email,
                    password: password,
                },
            })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};
