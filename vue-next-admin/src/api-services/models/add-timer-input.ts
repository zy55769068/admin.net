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
import { RequestTypeEnum } from './request-type-enum';
import { SpareTimeExecuteTypes } from './spare-time-execute-types';
import { SpareTimeTypes } from './spare-time-types';
/**
 * 
 * @export
 * @interface AddTimerInput
 */
export interface AddTimerInput {
    /**
     * 雪花Id
     * @type {number}
     * @memberof AddTimerInput
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof AddTimerInput
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof AddTimerInput
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof AddTimerInput
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof AddTimerInput
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof AddTimerInput
     */
    isDelete?: boolean;
    /**
     * 是否只执行一次
     * @type {boolean}
     * @memberof AddTimerInput
     */
    doOnce?: boolean;
    /**
     * 是否立即执行
     * @type {boolean}
     * @memberof AddTimerInput
     */
    startNow?: boolean;
    /**
     * 
     * @type {SpareTimeExecuteTypes}
     * @memberof AddTimerInput
     */
    executeType?: SpareTimeExecuteTypes;
    /**
     * 执行间隔（单位秒）
     * @type {number}
     * @memberof AddTimerInput
     */
    interval?: number | null;
    /**
     * Cron表达式
     * @type {string}
     * @memberof AddTimerInput
     */
    cron?: string | null;
    /**
     * 
     * @type {SpareTimeTypes}
     * @memberof AddTimerInput
     */
    timerType?: SpareTimeTypes;
    /**
     * 请求url
     * @type {string}
     * @memberof AddTimerInput
     */
    requestUrl?: string | null;
    /**
     * 
     * @type {RequestTypeEnum}
     * @memberof AddTimerInput
     */
    requestType?: RequestTypeEnum;
    /**
     * 请求参数
     * @type {string}
     * @memberof AddTimerInput
     */
    requestPara?: string | null;
    /**
     * Headers参数 比如{\"Authorization\":\"userpassword\"}
     * @type {string}
     * @memberof AddTimerInput
     */
    headers?: string | null;
    /**
     * 排序
     * @type {number}
     * @memberof AddTimerInput
     */
    order?: number;
    /**
     * 备注
     * @type {string}
     * @memberof AddTimerInput
     */
    remark?: string | null;
    /**
     * 任务名称
     * @type {string}
     * @memberof AddTimerInput
     */
    timerName: string;
}
