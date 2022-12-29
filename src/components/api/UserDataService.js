import axios from 'axios';

import { API_URL } from '../../API_URL';

class UserDataService {
    executeGetAllUsers() {
        return axios.get(`${API_URL}/users-list`);
    }

    executeFindUserById(id) {
        return axios.get(`${API_URL}/users/${id}`);
    }

    executeFindUserByUsername(username) {
        return axios.get(`${API_URL}/users/username/${username}`);
    }

    executeDeleteUserById(id) {
        return axios.delete(`${API_URL}/users/delete/${id}`);
    }

    executeCreateUser(user) {
        return axios.post(`${API_URL}/users/create`, user);
    }

    executeUpdateUser(id, user) {
        return axios.put(`${API_URL}/users/update/${id}`, user);
    }

}

export default new UserDataService();



