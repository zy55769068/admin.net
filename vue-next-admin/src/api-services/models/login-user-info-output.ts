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
import { LoginRole } from './login-role';
/**
 * 用户登录信息
 * @export
 * @interface LoginUserInfoOutput
 */
export interface LoginUserInfoOutput {
    /**
     * 用户Id
     * @type {number}
     * @memberof LoginUserInfoOutput
     */
    userId?: number;
    /**
     * 账号名称
     * @type {string}
     * @memberof LoginUserInfoOutput
     */
    username?: string | null;
    /**
     * 真实姓名
     * @type {string}
     * @memberof LoginUserInfoOutput
     */
    realName?: string | null;
    /**
     * 头像
     * @type {string}
     * @memberof LoginUserInfoOutput
     */
    avatar?: string | null;
    /**
     * 个人简介
     * @type {string}
     * @memberof LoginUserInfoOutput
     */
    desc?: string | null;
    /**
     * 机构Id
     * @type {number}
     * @memberof LoginUserInfoOutput
     */
    orgId?: number;
    /**
     * 机构名称
     * @type {string}
     * @memberof LoginUserInfoOutput
     */
    orgName?: string | null;
    /**
     * 机构级别
     * @type {string}
     * @memberof LoginUserInfoOutput
     */
    orgLevel?: string | null;
    /**
     * 角色集合
     * @type {Array<LoginRole>}
     * @memberof LoginUserInfoOutput
     */
    roles?: Array<LoginRole> | null;
    /**
     * 按钮权限集合
     * @type {Array<string>}
     * @memberof LoginUserInfoOutput
     */
    buttons?: Array<string> | null;
}
