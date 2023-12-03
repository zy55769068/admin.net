/* tslint:disable */
/* eslint-disable */
/**
 * Admin.NET 通用权限开发平台
 * 让 .NET 开发更简单、更通用、更流行。前后端分离架构(.NET6/Vue3)，开箱即用紧随前沿技术。<br/><a href='https://gitee.com/zuohuaijun/Admin.NET/'>https://gitee.com/zuohuaijun/Admin.NET</a>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: 515096995@qq.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { SysRegion } from './sys-region';
import {
    SysRegion,
} from ".";

/**
 * 
 *
 * @export
 * @interface AddRegionInput
 */
export interface AddRegionInput {

    /**
     * 雪花Id
     *
     * @type {number}
     * @memberof AddRegionInput
     */
    id?: number;

    /**
     * 父Id
     *
     * @type {number}
     * @memberof AddRegionInput
     */
    pid?: number;

    /**
     * 简称
     *
     * @type {string}
     * @memberof AddRegionInput
     */
    shortName?: string | null;

    /**
     * 组合名
     *
     * @type {string}
     * @memberof AddRegionInput
     */
    mergerName?: string | null;

    /**
     * 行政代码
     *
     * @type {string}
     * @memberof AddRegionInput
     */
    code?: string | null;

    /**
     * 邮政编码
     *
     * @type {string}
     * @memberof AddRegionInput
     */
    zipCode?: string | null;

    /**
     * 区号
     *
     * @type {string}
     * @memberof AddRegionInput
     */
    cityCode?: string | null;

    /**
     * 层级
     *
     * @type {number}
     * @memberof AddRegionInput
     */
    level?: number;

    /**
     * 拼音
     *
     * @type {string}
     * @memberof AddRegionInput
     */
    pinYin?: string | null;

    /**
     * 经度
     *
     * @type {number}
     * @memberof AddRegionInput
     */
    lng?: number;

    /**
     * 维度
     *
     * @type {number}
     * @memberof AddRegionInput
     */
    lat?: number;

    /**
     * 排序
     *
     * @type {number}
     * @memberof AddRegionInput
     */
    orderNo?: number;

    /**
     * 备注
     *
     * @type {string}
     * @memberof AddRegionInput
     */
    remark?: string | null;

    /**
     * 机构子项
     *
     * @type {Array<SysRegion>}
     * @memberof AddRegionInput
     */
    children?: Array<SysRegion> | null;

    /**
     * 名称
     *
     * @type {string}
     * @memberof AddRegionInput
     */
    name: string;
}
