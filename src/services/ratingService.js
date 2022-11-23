import axios from 'axios';
import userService from './userService';

const getUserRatings = (idUser, accessToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `http://localhost:8081/api/ratings/${idUser}`,
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
    addRating: (rating, accessToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'http://localhost:8081/api/ratings/new',
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {
                    id: rating.id,
                    value: rating.value,
                    comment: rating.comment,
                    idReceiver: rating.idReceiver,
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
    deleteRating: (idRating, accessToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: `http://localhost:8081/api/ratings/delete/${idRating}`,
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {},
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getCandidateRatings: async (idUser, accessToken) => {
        const ratings = await getUserRatings(idUser, accessToken);
        let finalRatings = [];

        await Promise.all(
            ratings.map(async (rating) => {
                const sender = await userService.getEmployerById(
                    rating.idSender,
                    accessToken
                );

                const assembledRating = {
                    id: rating.id,
                    value: rating.value,
                    date: rating.date,
                    comment: rating.comment,
                    sender: {
                        id: sender.id,
                        companyName: sender.companyName,
                    },
                };
                finalRatings = [...finalRatings, assembledRating];
            })
        );
        return finalRatings;
    },
    getEmployerRatings: async (idUser, accessToken) => {
        const ratings = await getUserRatings(idUser, accessToken);
        let finalRatings = [];

        await Promise.all(
            ratings.map(async (rating) => {
                const sender = await userService.getCandidateById(
                    rating.idSender,
                    accessToken
                );

                const assembledRating = {
                    id: rating.id,
                    value: rating.value,
                    date: rating.date,
                    comment: rating.comment,
                    sender: {
                        id: sender.id,
                        lastName: sender.lastName,
                        firstName: sender.firstName,
                    },
                };
                finalRatings = [...finalRatings, assembledRating];
            })
        );
        return finalRatings;
    },
    getRatingByIdSenderAndIdReceiver: async (
        idSender,
        idReceiver,
        accessToken
    ) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `http://localhost:8081/api/ratings/${idSender}/${idReceiver}`,
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {},
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    return null;
                });
        });
    },
};
