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
import { TriggerStatus } from './trigger-status';
/**
 * 系统作业触发器表
 * @export
 * @interface SysJobTrigger
 */
export interface SysJobTrigger {
    /**
     * Id
     * @type {number}
     * @memberof SysJobTrigger
     */
    id?: number;
    /**
     * 触发器Id
     * @type {string}
     * @memberof SysJobTrigger
     */
    triggerId?: string | null;
    /**
     * 作业Id
     * @type {string}
     * @memberof SysJobTrigger
     */
    jobId?: string | null;
    /**
     * 触发器类型FullName
     * @type {string}
     * @memberof SysJobTrigger
     */
    triggerType?: string | null;
    /**
     * 程序集Name
     * @type {string}
     * @memberof SysJobTrigger
     */
    assemblyName?: string | null;
    /**
     * 参数
     * @type {string}
     * @memberof SysJobTrigger
     */
    args?: string | null;
    /**
     * 描述信息
     * @type {string}
     * @memberof SysJobTrigger
     */
    description?: string | null;
    /**
     * 
     * @type {TriggerStatus}
     * @memberof SysJobTrigger
     */
    status?: TriggerStatus;
    /**
     * 起始时间
     * @type {Date}
     * @memberof SysJobTrigger
     */
    startTime?: Date | null;
    /**
     * 结束时间
     * @type {Date}
     * @memberof SysJobTrigger
     */
    endTime?: Date | null;
    /**
     * 最近运行时间
     * @type {Date}
     * @memberof SysJobTrigger
     */
    lastRunTime?: Date | null;
    /**
     * 下一次运行时间
     * @type {Date}
     * @memberof SysJobTrigger
     */
    nextRunTime?: Date | null;
    /**
     * 触发次数
     * @type {number}
     * @memberof SysJobTrigger
     */
    numberOfRuns?: number;
    /**
     * 最大触发次数（0:不限制，n:N次）
     * @type {number}
     * @memberof SysJobTrigger
     */
    maxNumberOfRuns?: number;
    /**
     * 出错次数
     * @type {number}
     * @memberof SysJobTrigger
     */
    numberOfErrors?: number;
    /**
     * 最大出错次数（0:不限制，n:N次）
     * @type {number}
     * @memberof SysJobTrigger
     */
    maxNumberOfErrors?: number;
    /**
     * 重试次数
     * @type {number}
     * @memberof SysJobTrigger
     */
    numRetries?: number;
    /**
     * 重试间隔时间（ms）
     * @type {number}
     * @memberof SysJobTrigger
     */
    retryTimeout?: number;
    /**
     * 是否立即启动
     * @type {boolean}
     * @memberof SysJobTrigger
     */
    startNow?: boolean;
    /**
     * 是否启动时执行一次
     * @type {boolean}
     * @memberof SysJobTrigger
     */
    runOnStart?: boolean;
    /**
     * 是否在启动时重置最大触发次数等于一次的作业
     * @type {boolean}
     * @memberof SysJobTrigger
     */
    resetOnlyOnce?: boolean;
    /**
     * 更新时间
     * @type {Date}
     * @memberof SysJobTrigger
     */
    updatedTime?: Date | null;
}
