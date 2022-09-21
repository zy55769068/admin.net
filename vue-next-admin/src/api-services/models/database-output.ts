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
import { DbType } from './db-type';
/**
 * 多库代码生成库列表输出
 * @export
 * @interface DatabaseOutput
 */
export interface DatabaseOutput {
    /**
     * 库定位器名
     * @type {string}
     * @memberof DatabaseOutput
     */
    configId?: string | null;
    /**
     * 
     * @type {DbType}
     * @memberof DatabaseOutput
     */
    dbType?: DbType;
    /**
     * 数据库连接字符串
     * @type {string}
     * @memberof DatabaseOutput
     */
    connectionString?: string | null;
}
