// import { buildApiUrl, isset } from "@/helpers/CommonHelper";
// import { useLoading } from 'vue-loading-overlay';
// import { throwAuthenticationException } from "@/helpers/ExceptionHelper";

// import axios, { AxiosRequestConfig } from 'axios'; // Import axios và AxiosRequestConfig từ axios module

import axios from 'axios';

export function axiosGet(path: string, params: any = {}, headers: any = {}, isUseAccessToken: boolean = true, isLoading: boolean = true) {
    return request('get', path, params, headers, isUseAccessToken, isLoading);
}

export function axiosPost(path: string, params: any = {}, headers: any = {}, isUseAccessToken: boolean = true, isLoading: boolean = true) {
    return request('post', path, params, headers, isUseAccessToken, isLoading);
}

export function axiosPatch(path: string, params: any = {}, headers: any = {}, isUseAccessToken: boolean = true, isLoading: boolean = true) {
    return request('patch', path, params, headers, isUseAccessToken, isLoading);
}

export function isSuccessRequest(response: any) {
    return response.isHttpSuccess ?? false;
}
export function buildApiUrl(path:string) {
    return `https://daily-dev.edupia.com.vn/api/${path}`;
}

function request(method: string, path: string, params: any, headers: any, isUseAccessToken: boolean, isLoading: boolean) {
    delete params["__v_isShallow"];
    delete params["__v_isRef"];
    delete params["_rawValue"];
    delete params["_value"];

    // if (isLoading) {
    //     var loader = useLoading().show();
    // }

    if (isUseAccessToken && localStorage.getItem('access_token')) {
        headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }

    let axiosConfig: any = {
        method: method,
        url: buildApiUrl(path),
        headers: headers
    };

    if (method === 'get') {
        axiosConfig.params = params;
    } else {
        axiosConfig.data = params;
    }

    return axios(axiosConfig).then(({ data }) => {
        return {
            code: data.code,
            data: data.data,
            isHttpSuccess: true
        };
    }).catch(({ response }) => {
        if (response.status === 401 || response.status === 403) {
            console.log('bị lỗi :' + response.status);
            // throwAuthenticationException();
        }
        return {
            code: response.data.code,
            data: response.data.data,
            message: response.data.message,
            httpCode: response.status,
            isHttpSuccess: false
        };
    });
}
