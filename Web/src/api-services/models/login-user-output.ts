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
/**
 * 用户登录信息
 * @export
 * @interface LoginUserOutput
 */
export interface LoginUserOutput {
    /**
     * 用户id
     * @type {number}
     * @memberof LoginUserOutput
     */
    id?: number;
    /**
     * 账号名称
     * @type {string}
     * @memberof LoginUserOutput
     */
    account?: string | null;
    /**
     * 真实姓名
     * @type {string}
     * @memberof LoginUserOutput
     */
    realName?: string | null;
    /**
     * 头像
     * @type {string}
     * @memberof LoginUserOutput
     */
    avatar?: string | null;
    /**
     * 个人简介
     * @type {string}
     * @memberof LoginUserOutput
     */
    introduction?: string | null;
    /**
     * 地址
     * @type {string}
     * @memberof LoginUserOutput
     */
    address?: string | null;
    /**
     * 电子签名
     * @type {string}
     * @memberof LoginUserOutput
     */
    signature?: string | null;
    /**
     * 机构Id
     * @type {number}
     * @memberof LoginUserOutput
     */
    orgId?: number;
    /**
     * 机构名称
     * @type {string}
     * @memberof LoginUserOutput
     */
    orgName?: string | null;
    /**
     * 机构类型
     * @type {string}
     * @memberof LoginUserOutput
     */
    orgType?: string | null;
    /**
     * 职位名称
     * @type {string}
     * @memberof LoginUserOutput
     */
    posName?: string | null;
    /**
     * 按钮权限集合
     * @type {Array<string>}
     * @memberof LoginUserOutput
     */
    buttons?: Array<string> | null;
}
