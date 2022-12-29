
import axios from 'axios';

import { API_URL } from '../../API_URL';

class JobDataService {
    executeGetAllJobs() {
        return axios.get(`${API_URL}/jobs-list`);
    }

    executeFindJobById(id) {
        return axios.get(`${API_URL}/jobs/${id}`);
    }

    executeDeleteJobById(id) {
        return axios.delete(`${API_URL}/jobs/delete/${id}`);
    }

    executeCreateJob(job) {
        return axios.post(`${API_URL}/jobs/create`, job);
    }

    executeUpdateJob(id, job) {
        return axios.put(`${API_URL}/jobs/update/${id}`, job);
    }
}

export default new JobDataService();