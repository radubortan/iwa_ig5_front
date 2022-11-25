import axios from 'axios';

export default {
    addJobOffer: (jobOffer, accessToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `http://localhost:8080/api/job-offers`,
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {
                    title: jobOffer.title,
                    description: jobOffer.description,
                    beginningDate: jobOffer.beginningDate,
                    endingDate: jobOffer.endingDate,
                    place: jobOffer.place,
                    numberPositions: jobOffer.numberPositions,
                    remuneration: jobOffer.remuneration,
                    publishingDate: jobOffer.publishingDate,
                    idEmployer: jobOffer.idEmployer
                },
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
        });

    },
    updateJobOffer: (jobOffer, accessToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: `http://localhost:8080/api/job-offers/${idJobOffer}`,
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {
                    title: jobOffer.title,
                    description: jobOffer.description,
                    beginningDate: jobOffer.beginningDate,
                    endingDate: jobOffer.endingDate,
                    place: jobOffer.place,
                    numberPositions: jobOffer.numberPositions,
                    remuneration: jobOffer.remuneration,
                    publishingDate: jobOffer.publishingDate,
                    idEmployer: jobOffer.idEmployer
                },
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    deleteJobOffer: (idJobOffer, accessToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: `http://localhost:8080/api/job-offers/${idJobOffer}`,
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
    },

    getAllJobOffers: (accessToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `http://localhost:8080/api/job-offers`,
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
    },
    getJobOfferById: (idJobOffer, accessToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `http://localhost:8080/api/job-offers/${idJobOffer}`,
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
    },

    getJobOffersByIdEmployer: (idEmployer, accessToken) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `http://localhost:8080/api/job-offers/employer/${idEmployer}`,
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
    }
}