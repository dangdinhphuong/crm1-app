const API_PATH:any = {
    LOGIN: "login",
    LOGOUT: "logout",
    ME_INFO: "me",

    ALL_ROLE: 'all/roles',
    ALL_DEPARTMENT: 'all/departments',

    ROLE_LIST: 'roles',
    ROLE_CREATE: 'roles',
    ROLE_DETAIL: 'roles/{id}',
    ROLE_UPDATE: 'roles/{id}',
    ROLE_ACTIVE: 'roles/{id}/active',
    ROLE_DEACTIVATE: 'roles/{id}/deactivate',
    MODULE_GROUP_PERMISSION_LIST: 'roles/module-group-permission',

    PERMISSION_LIST: 'permissions',

    USER_LIST: 'users',
    USER_SALE: 'user/sale',
    USER_CREATE: 'users',
    USER_DETAIL: 'users/{id}',
    USER_UPDATE: 'users/{id}',

    ORDER_LIST: 'order',
    ORDER_STATUS: 'order/status',

    DISTRICT_LIST: 'district',

    GROUP_LIST: 'groups',

    PRODUCT_LIST: 'product',

    CATEGORY_LIST: 'category',

    CAMPAIGN_LIST: 'campaign',
};

export default API_PATH;
