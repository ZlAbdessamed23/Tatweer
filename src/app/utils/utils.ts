import axios from 'axios';
import { User } from '../api/auth/signin/types';

type SignupRequest = {
    adminInfo: {
        adminFirstName: string;
        adminLastName: string;
        adminEmail: string;
        adminPassword: string;
    };
    companyInfo: {
        companyName: string;
        companyEmployeeNumber: number;
        companyLocation: string;
        companyEmail: string;
    };
}


const API_BASE_URL = 'http://localhost:3000/api';

export const signup = async (signupData: SignupRequest): Promise<string> => {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, signupData);
    return response.data.message;
};

export const login = async (loginData: User): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    return response.data.message;
};