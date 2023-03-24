/* tslint:disable */
/* eslint-disable */
/**
 * 所有接口
 * 让 .NET 开发更简单、更通用、更流行。前后端分离架构(.NET6/Vue3)，开箱即用紧随前沿技术。<br/><a href='https://gitee.com/zuohuaijun/Admin.NET/'>https://gitee.com/zuohuaijun/Admin.NET</a>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: 515096995@qq.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { SqlSugarPagedListSysLogOp } from './sql-sugar-paged-list-sys-log-op';
/**
 * 全局返回结果
 * @export
 * @interface AdminResultSqlSugarPagedListSysLogOp
 */
export interface AdminResultSqlSugarPagedListSysLogOp {
    /**
     * 状态码
     * @type {number}
     * @memberof AdminResultSqlSugarPagedListSysLogOp
     */
    code?: number;
    /**
     * 类型success、warning、error
     * @type {string}
     * @memberof AdminResultSqlSugarPagedListSysLogOp
     */
    type?: string | null;
    /**
     * 错误信息
     * @type {string}
     * @memberof AdminResultSqlSugarPagedListSysLogOp
     */
    message?: string | null;
    /**
     * 
     * @type {SqlSugarPagedListSysLogOp}
     * @memberof AdminResultSqlSugarPagedListSysLogOp
     */
    result?: SqlSugarPagedListSysLogOp;
    /**
     * 附加数据
     * @type {any}
     * @memberof AdminResultSqlSugarPagedListSysLogOp
     */
    extras?: any | null;
    /**
     * 时间
     * @type {Date}
     * @memberof AdminResultSqlSugarPagedListSysLogOp
     */
    time?: Date;
}
