//cmd line; npm add axios
import axios from 'axios';

import { API_URL } from '../../API_URL';

class ItemDataService {
    executeGetAllItems() {
        //console.log("executed service");
        return axios.get(`${API_URL}/items-list`);
    }

    executeFindItemById(id) {
        return axios.get(`${API_URL}/items/${id}`);
    }

    executeDeleteItemById(id) {
        return axios.delete(`${API_URL}/items/delete/${id}`);
    }

    executeCreateItem(item) {
        return axios.post(`${API_URL}/items/create`, item);
    }

    executeUpdateItem(id, item) {
        return axios.put(`${API_URL}/items/update/${id}`, item);
    }
    
}


export default new ItemDataService();