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
import { LoginUserInfoOutput } from './login-user-info-output';
/**
 * 全局返回结果
 * @export
 * @interface AdminResultLoginUserInfoOutput
 */
export interface AdminResultLoginUserInfoOutput {
    /**
     * 状态码
     * @type {number}
     * @memberof AdminResultLoginUserInfoOutput
     */
    code?: number;
    /**
     * 类型success、warning、error
     * @type {string}
     * @memberof AdminResultLoginUserInfoOutput
     */
    type?: string | null;
    /**
     * 错误信息
     * @type {string}
     * @memberof AdminResultLoginUserInfoOutput
     */
    message?: string | null;
    /**
     * 
     * @type {LoginUserInfoOutput}
     * @memberof AdminResultLoginUserInfoOutput
     */
    result?: LoginUserInfoOutput;
    /**
     * 附加数据
     * @type {any}
     * @memberof AdminResultLoginUserInfoOutput
     */
    extras?: any | null;
    /**
     * 时间戳
     * @type {number}
     * @memberof AdminResultLoginUserInfoOutput
     */
    timestamp?: number;
}
