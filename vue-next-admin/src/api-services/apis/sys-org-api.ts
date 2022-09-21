/* tslint:disable */
/* eslint-disable */
/**
 * Admin.NET
 * 让 .NET 开发更简单、更通用、更流行。前后端分离架构(.NET6/Vue3)，开箱即用紧随前沿技术。<br/><a href='https://gitee.com/zuohuaijun/Admin.NET/'>https://gitee.com/zuohuaijun/Admin.NET</a>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: 515096995@qq.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { AddOrgInput } from '../models';
import { AdminResultInt64 } from '../models';
import { AdminResultListSysOrg } from '../models';
import { DeleteOrgInput } from '../models';
import { UpdateOrgInput } from '../models';
/**
 * SysOrgApi - axios parameter creator
 * @export
 */
export const SysOrgApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加机构
         * @param {AddOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysOrgAddPost: async (body?: AddOrgInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysOrg/add`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 删除机构
         * @param {DeleteOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysOrgDeletePost: async (body?: DeleteOrgInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysOrg/delete`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 获取机构列表
         * @param {number} id 主键Id
         * @param {number} [pid] 父Id
         * @param {string} [name] 名称
         * @param {string} [code] 编码
         * @param {number} [order] 排序
         * @param {string} [remark] 备注
         * @param {number} [status] 状态
         * @param {string} [level] 级别 例如：省、市、县、区
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysOrgListGet: async (id: number, pid?: number, name?: string, code?: string, order?: number, remark?: string, status?: number, level?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling sysOrgListGet.');
            }
            const localVarPath = `/sysOrg/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            if (pid !== undefined) {
                localVarQueryParameter['Pid'] = pid;
            }

            if (name !== undefined) {
                localVarQueryParameter['Name'] = name;
            }

            if (code !== undefined) {
                localVarQueryParameter['Code'] = code;
            }

            if (order !== undefined) {
                localVarQueryParameter['Order'] = order;
            }

            if (remark !== undefined) {
                localVarQueryParameter['Remark'] = remark;
            }

            if (status !== undefined) {
                localVarQueryParameter['Status'] = status;
            }

            if (level !== undefined) {
                localVarQueryParameter['Level'] = level;
            }

            if (id !== undefined) {
                localVarQueryParameter['Id'] = id;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 更新机构
         * @param {UpdateOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysOrgUpdatePost: async (body?: UpdateOrgInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sysOrg/update`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 获取用户拥有机构信息列表
         * @param {number} userId 用户id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sysOrgUserOwnOrgInfoUserIdGet: async (userId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling sysOrgUserOwnOrgInfoUserIdGet.');
            }
            const localVarPath = `/sysOrg/userOwnOrgInfo/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SysOrgApi - functional programming interface
 * @export
 */
export const SysOrgApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 增加机构
         * @param {AddOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgAddPost(body?: AddOrgInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultInt64>>> {
            const localVarAxiosArgs = await SysOrgApiAxiosParamCreator(configuration).sysOrgAddPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 删除机构
         * @param {DeleteOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgDeletePost(body?: DeleteOrgInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysOrgApiAxiosParamCreator(configuration).sysOrgDeletePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取机构列表
         * @param {number} id 主键Id
         * @param {number} [pid] 父Id
         * @param {string} [name] 名称
         * @param {string} [code] 编码
         * @param {number} [order] 排序
         * @param {string} [remark] 备注
         * @param {number} [status] 状态
         * @param {string} [level] 级别 例如：省、市、县、区
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgListGet(id: number, pid?: number, name?: string, code?: string, order?: number, remark?: string, status?: number, level?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysOrg>>> {
            const localVarAxiosArgs = await SysOrgApiAxiosParamCreator(configuration).sysOrgListGet(id, pid, name, code, order, remark, status, level, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 更新机构
         * @param {UpdateOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgUpdatePost(body?: UpdateOrgInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await SysOrgApiAxiosParamCreator(configuration).sysOrgUpdatePost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 获取用户拥有机构信息列表
         * @param {number} userId 用户id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgUserOwnOrgInfoUserIdGet(userId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<AdminResultListSysOrg>>> {
            const localVarAxiosArgs = await SysOrgApiAxiosParamCreator(configuration).sysOrgUserOwnOrgInfoUserIdGet(userId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SysOrgApi - factory interface
 * @export
 */
export const SysOrgApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 增加机构
         * @param {AddOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgAddPost(body?: AddOrgInput, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultInt64>> {
            return SysOrgApiFp(configuration).sysOrgAddPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 删除机构
         * @param {DeleteOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgDeletePost(body?: DeleteOrgInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysOrgApiFp(configuration).sysOrgDeletePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取机构列表
         * @param {number} id 主键Id
         * @param {number} [pid] 父Id
         * @param {string} [name] 名称
         * @param {string} [code] 编码
         * @param {number} [order] 排序
         * @param {string} [remark] 备注
         * @param {number} [status] 状态
         * @param {string} [level] 级别 例如：省、市、县、区
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgListGet(id: number, pid?: number, name?: string, code?: string, order?: number, remark?: string, status?: number, level?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysOrg>> {
            return SysOrgApiFp(configuration).sysOrgListGet(id, pid, name, code, order, remark, status, level, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 更新机构
         * @param {UpdateOrgInput} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgUpdatePost(body?: UpdateOrgInput, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return SysOrgApiFp(configuration).sysOrgUpdatePost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 获取用户拥有机构信息列表
         * @param {number} userId 用户id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sysOrgUserOwnOrgInfoUserIdGet(userId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<AdminResultListSysOrg>> {
            return SysOrgApiFp(configuration).sysOrgUserOwnOrgInfoUserIdGet(userId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SysOrgApi - object-oriented interface
 * @export
 * @class SysOrgApi
 * @extends {BaseAPI}
 */
export class SysOrgApi extends BaseAPI {
    /**
     * 
     * @summary 增加机构
     * @param {AddOrgInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async sysOrgAddPost(body?: AddOrgInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultInt64>> {
        return SysOrgApiFp(this.configuration).sysOrgAddPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 删除机构
     * @param {DeleteOrgInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async sysOrgDeletePost(body?: DeleteOrgInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysOrgApiFp(this.configuration).sysOrgDeletePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取机构列表
     * @param {number} id 主键Id
     * @param {number} [pid] 父Id
     * @param {string} [name] 名称
     * @param {string} [code] 编码
     * @param {number} [order] 排序
     * @param {string} [remark] 备注
     * @param {number} [status] 状态
     * @param {string} [level] 级别 例如：省、市、县、区
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async sysOrgListGet(id: number, pid?: number, name?: string, code?: string, order?: number, remark?: string, status?: number, level?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysOrg>> {
        return SysOrgApiFp(this.configuration).sysOrgListGet(id, pid, name, code, order, remark, status, level, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 更新机构
     * @param {UpdateOrgInput} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async sysOrgUpdatePost(body?: UpdateOrgInput, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return SysOrgApiFp(this.configuration).sysOrgUpdatePost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 获取用户拥有机构信息列表
     * @param {number} userId 用户id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SysOrgApi
     */
    public async sysOrgUserOwnOrgInfoUserIdGet(userId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<AdminResultListSysOrg>> {
        return SysOrgApiFp(this.configuration).sysOrgUserOwnOrgInfoUserIdGet(userId, options).then((request) => request(this.axios, this.basePath));
    }
}
