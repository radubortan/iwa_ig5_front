import axios from 'axios';

export default {
    getEmployerById: async (id, accessToken) => {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/api/users/employer/${id}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {},
        });
        return response.data;
    },
    getCandidateById: async (id, accessToken) => {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/api/users/candidate/${id}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {},
        });
        return response.data;
    },
    getUserRole: async (userId, accessToken) => {
        try {
            const response = await axios({
                method: 'get',
                url: `http://localhost:8080/api/users/${userId}/role`,
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {},
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },
    updateCandidate: async (userId, candidate, accessToken) => {
        let date = candidate.birthday;

        //if the date is a string, it means that is wasn't modified so no need to do this
        //if the date isn't a string, it means that it's been changed and we have to add a day to it
        if (typeof candidate.birthday !== 'string') {
            const tempDate = date.toDate();
            tempDate.setDate(tempDate.getDate() + 1);
            date = tempDate;
        }
        //transforming the id to a string otherwise axios will try to round it
        const stringId = userId.toString();
        try {
            const response = await axios({
                method: 'put',
                url: `http://localhost:8080/api/users/candidate/${stringId}/update`,
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {
                    id: stringId,
                    birthday: date,
                    firstName: candidate.firstName,
                    lastName: candidate.lastName,
                    phoneNumber: candidate.phoneNumber,
                },
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },
    updateEmployer: async (userId, employer, accessToken) => {
        //transforming the id to a string otherwise axios will try to round it
        const stringId = userId.toString();
        try {
            const response = await axios({
                method: 'put',
                url: `http://localhost:8080/api/users/employer/${stringId}/update`,
                headers: { Authorization: `Bearer ${accessToken}` },
                data: {
                    id: stringId,
                    address: employer.address,
                    companyName: employer.companyName,
                    phoneNumber: employer.phoneNumber,
                },
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },
};
