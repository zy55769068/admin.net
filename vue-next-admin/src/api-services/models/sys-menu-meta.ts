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
 * 菜单Meta配置
 * @export
 * @interface SysMenuMeta
 */
export interface SysMenuMeta {
    /**
     * 标题
     * @type {string}
     * @memberof SysMenuMeta
     */
    title?: string | null;
    /**
     * 图标
     * @type {string}
     * @memberof SysMenuMeta
     */
    icon?: string | null;
    /**
     * 内嵌地址
     * @type {string}
     * @memberof SysMenuMeta
     */
    frameSrc?: string | null;
    /**
     * 排序
     * @type {number}
     * @memberof SysMenuMeta
     */
    orderNo?: number;
    /**
     * 是否显示
     * @type {boolean}
     * @memberof SysMenuMeta
     */
    hideMenu?: boolean;
    /**
     * 是否忽略KeepAlive缓存
     * @type {boolean}
     * @memberof SysMenuMeta
     */
    ignoreKeepAlive?: boolean;
    /**
     * 当前激活的菜单-用于配置详情页时左侧激活的菜单路径
     * @type {string}
     * @memberof SysMenuMeta
     */
    currentActiveMenu?: string | null;
}
