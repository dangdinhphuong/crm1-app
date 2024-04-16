import {axiosGet, axiosPost, isSuccessRequest} from '@/helpers/ApiHelper'; // Import axios functions
import { ROUTE_NAME } from "@/constants/RouteNameConstant";
import { authStore } from '@/stores/AuthStore'; // Import authStore
import router from '@/router/index';
import apiPathConstant from '@/constants/ApiPathConstant'; // Import constants
// import { isSuccessRequest } from './utils'; // Import isSuccessRequest function

export default class AuthService {
    private accessTokenKey: string = 'access_token';

    public setAccessToken(accessToken: string): void {
        localStorage.setItem(this.accessTokenKey, accessToken);
    }

    public getAccessToken(): string | null {
        return localStorage.getItem(this.accessTokenKey);
    }

    public removeAccessToken(): void {
        localStorage.removeItem(this.accessTokenKey);
    }

    public async login(username: string, password: string): Promise<void> {
        try {
            const response = await axiosPost('login', {
                username: username,
                password: password
            }, {}, false);
            if(response.data != undefined && response.data.access_token != undefined ){
           this.setAccessToken(response.data.access_token);
           console.log('Login thành công:' , response);
             authStore().setUser(response.data.user);
             router.push({ name: ROUTE_NAME.HOME });
            }else{
                throw "error";
            }
        } catch (error) {
            throw error; // Propagate the error up
        }
    }

    // public logout(): void {
    //     this.removeAccessToken();
    //     authStore().$reset();
    //     router.push({ name: routeNameConstant.LOGIN });
    // }

    public async getCurrentUser(): Promise<any> {
        try {
            const response = await axiosGet(apiPathConstant.ME_INFO);
            if (isSuccessRequest(response)) {
                return response.data;
            } else {
                throw new Error('Failed to fetch current user information');
            }
        } catch (error) {
            console.error('Error during getCurrentUser:', error);
            throw error; // Propagate the error up
        }
    }
}
