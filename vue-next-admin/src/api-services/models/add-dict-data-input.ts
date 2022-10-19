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
import { StatusEnum } from './status-enum';
import { SysDictType } from './sys-dict-type';
/**
 * 
 * @export
 * @interface AddDictDataInput
 */
export interface AddDictDataInput {
    /**
     * 雪花Id
     * @type {number}
     * @memberof AddDictDataInput
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof AddDictDataInput
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof AddDictDataInput
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof AddDictDataInput
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof AddDictDataInput
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof AddDictDataInput
     */
    isDelete?: boolean;
    /**
     * 字典类型Id
     * @type {number}
     * @memberof AddDictDataInput
     */
    dictTypeId?: number;
    /**
     * 
     * @type {SysDictType}
     * @memberof AddDictDataInput
     */
    dictType?: SysDictType;
    /**
     * 值
     * @type {string}
     * @memberof AddDictDataInput
     */
    value: string;
    /**
     * 编码
     * @type {string}
     * @memberof AddDictDataInput
     */
    code: string;
    /**
     * 排序
     * @type {number}
     * @memberof AddDictDataInput
     */
    order?: number;
    /**
     * 备注
     * @type {string}
     * @memberof AddDictDataInput
     */
    remark?: string | null;
    /**
     * 
     * @type {StatusEnum}
     * @memberof AddDictDataInput
     */
    status?: StatusEnum;
}
