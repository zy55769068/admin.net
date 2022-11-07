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
import { LoginTypeEnum } from './login-type-enum';
import { YesNoEnum } from './yes-no-enum';
/**
 * 系统访问日志表
 * @export
 * @interface SysLogVis
 */
export interface SysLogVis {
    /**
     * 雪花Id
     * @type {number}
     * @memberof SysLogVis
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof SysLogVis
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof SysLogVis
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof SysLogVis
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof SysLogVis
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof SysLogVis
     */
    isDelete?: boolean;
    /**
     * 
     * @type {YesNoEnum}
     * @memberof SysLogVis
     */
    success?: YesNoEnum;
    /**
     * 具体消息
     * @type {string}
     * @memberof SysLogVis
     */
    message?: string | null;
    /**
     * IP地址
     * @type {string}
     * @memberof SysLogVis
     */
    ip?: string | null;
    /**
     * 地址
     * @type {string}
     * @memberof SysLogVis
     */
    location?: string | null;
    /**
     * 浏览器
     * @type {string}
     * @memberof SysLogVis
     */
    browser?: string | null;
    /**
     * 操作系统
     * @type {string}
     * @memberof SysLogVis
     */
    os?: string | null;
    /**
     * 
     * @type {LoginTypeEnum}
     * @memberof SysLogVis
     */
    visType?: LoginTypeEnum;
    /**
     * 账号
     * @type {string}
     * @memberof SysLogVis
     */
    account?: string | null;
    /**
     * 真实姓名
     * @type {string}
     * @memberof SysLogVis
     */
    realName?: string | null;
}
