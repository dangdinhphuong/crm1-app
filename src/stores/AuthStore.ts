import { defineStore } from 'pinia';
import AuthService from "@/service/AuthService";
 import { toRaw } from "vue";
// import { isEmptyObject, isArray, getEnv } from "@/helpers/CommonHelper";

export interface User {
    roles: string[];
    permissions: string[];
}

export interface AuthState {
    user: User;
}
export function isEmptyObject(object:any) {
    return !object || Object.keys(object).length === 0;
}

export const authStore = defineStore('authStore', {
    state: (): AuthState => ({
        user: {
            roles: [],
            permissions: []
        }
    }),

    actions: {
        async setUser(user: User) {
            this.user = user;
        },
        async loadUser() {
            console.log('isEmptyObject',isEmptyObject(this.user))
            if (!isEmptyObject(this.user)) {
                return;
            }
            const authService = new AuthService();
            console.log('authService',authService)
            if (authService.getAccessToken()) {
                this.user = await authService.getCurrentUser();
            }
        },
        // isLoggedIn(): boolean {
        //     return !isEmptyObject(this.user);
        // },
        // hasPermissions(permissions: string | string[]): boolean {
        //     if (this.isSuperAdmin()) {
        //         return true;
        //     }
        //     permissions = this.convertPermissionToArray(permissions);
        //     return permissions.every(item => this.getPermissions.includes(item));
        // },
        // hasAnyPermission(permissions: string | string[]): boolean {
        //     if (this.isSuperAdmin()) {
        //         return true;
        //     }
        //     permissions = this.convertPermissionToArray(permissions);
        //     return permissions.some(item => this.getPermissions.includes(item));
        // },
        // convertPermissionToArray(permissions: string | string[]): string[] {
        //     if (!isArray(permissions)) {
        //         permissions = [permissions];
        //     }
        //     return permissions;
        // },
        // isSuperAdmin(): boolean {
        //     const roleSuperAdmin = getEnv('APP_ROLE_SUPER_ADMIN');
        //     if (!roleSuperAdmin) {
        //         return false;
        //     }
        //     return this.getRoles.includes(roleSuperAdmin);
        // }
    },

    getters: {
        getUser(): User {
            return toRaw(this.user);
        },
        // getRoles(): string[] {
        //     return this.getUser.roles ?? [];
        // },
        // getPermissions(): string[] {
        //     return this.getUser.permissions ?? [];
        // }
    }
});
