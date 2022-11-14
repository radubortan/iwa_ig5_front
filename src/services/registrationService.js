import axios from 'axios';

export default {
    registerEmployer: (email, password, address, companyName, phoneNumber) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/registration/employer',
                header: {},
                data: {
                    email: email,
                    password: password,
                    address: address,
                    companyName: companyName,
                    phoneNumber: phoneNumber,
                },
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};
