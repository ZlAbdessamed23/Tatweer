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
        companyPhoneNumber: string;
    };
};


const API_BASE_URL = 'http://localhost:3000/api';

export const signup = async (signupData: SignupRequest): Promise<string> => {
    const fullInfos = { ...signupData.adminInfo, ...signupData.companyInfo, planName: "Free" , companyEmployeeNumber : Number(signupData.companyInfo.companyEmployeeNumber) };
    console.log(fullInfos);
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, fullInfos);
    return response.data.message;
};

export const login = async (loginData: User): Promise<string> => {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    return response.data.message;
};