import axios from 'axios';

import { API_URL } from '../../API_URL';

class CartDataService {
    executeFindCartListByUserId(id) {
        return axios.get(`${API_URL}/carts/list/user-id/${id}`);
    }

    executeCreateOrder(order) {
        return axios.post(`${API_URL}/carts/create`, order);
    }

    executeDeleteCartById(id) {
        return axios.delete(`${API_URL}/carts/delete/${id}`);
    }

    executeUpdateCartById(id, cart) {
        return axios.put(`${API_URL}/carts/update/${id}`, cart);
    }
}

export default new CartDataService();