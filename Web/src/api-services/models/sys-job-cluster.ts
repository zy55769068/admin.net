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
import { ClusterStatus } from './cluster-status';
/**
 * 系统作业集群表
 * @export
 * @interface SysJobCluster
 */
export interface SysJobCluster {
    /**
     * Id
     * @type {number}
     * @memberof SysJobCluster
     */
    id?: number;
    /**
     * 作业集群Id
     * @type {string}
     * @memberof SysJobCluster
     */
    clusterId?: string | null;
    /**
     * 描述信息
     * @type {string}
     * @memberof SysJobCluster
     */
    description?: string | null;
    /**
     * 
     * @type {ClusterStatus}
     * @memberof SysJobCluster
     */
    status?: ClusterStatus;
    /**
     * 更新时间
     * @type {Date}
     * @memberof SysJobCluster
     */
    updatedTime?: Date | null;
}
