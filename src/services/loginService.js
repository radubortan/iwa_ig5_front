import axios from 'axios';

const getCurrentUserId = (accountType, accessToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/users/${
                accountType === 'ROLE_EMPLOYER' ? 'employer' : 'candidate'
            }/id`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {},
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default {
    loginUser: async (email, password) => {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/login',
            header: {},
            data: {
                email: email,
                password: password,
            },
        });
        const idResponse = await getCurrentUserId(
            response.data.accountType,
            response.data.accessToken
        );
        return {
            accountType: response.data.accountType,
            accessToken: response.data.accessToken,
            accountId: idResponse,
        };
    },
};
