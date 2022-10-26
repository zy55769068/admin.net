﻿namespace Admin.NET.Core.Service;

/// <summary>
/// 系统用户服务
/// </summary>
[ApiDescriptionSettings(Order = 199)]
public class SysUserService : IDynamicApiController, ITransient
{
    private readonly UserManager _userManager;
    private readonly SqlSugarRepository<SysUser> _sysUserRep;
    private readonly SysOrgService _sysOrgService;
    private readonly SysUserExtOrgService _sysUserExtOrgService;
    private readonly SysUserRoleService _sysUserRoleService;

    public SysUserService(UserManager userManager,
        SqlSugarRepository<SysUser> sysUserRep,
        SysOrgService sysOrgService,
        SysUserExtOrgService sysUserExtOrgService,
        SysUserRoleService sysUserRoleService)
    {
        _userManager = userManager;
        _sysUserRep = sysUserRep;
        _sysOrgService = sysOrgService;
        _sysUserExtOrgService = sysUserExtOrgService;
        _sysUserRoleService = sysUserRoleService;
    }

    /// <summary>
    /// 获取用户分页列表
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpGet("/sysUser/page")]
    public async Task<SqlSugarPagedList<SysUser>> GetUserPage([FromQuery] PageUserInput input)
    {
        var orgList = input.OrgId > 0 ? await _sysOrgService.GetChildIdListWithSelfById(input.OrgId) :
            _userManager.SuperAdmin ? null : await _sysOrgService.GetChildIdListWithSelfById(_userManager.OrgId);

        return await _sysUserRep.AsQueryable()
            .WhereIF(!_userManager.SuperAdmin, u => u.AccountType != AccountTypeEnum.SuperAdmin)
            .WhereIF(orgList != null, u => orgList.Contains(u.OrgId))
            .WhereIF(!string.IsNullOrWhiteSpace(input.Account), u => u.Account.Contains(input.Account))
            .WhereIF(!string.IsNullOrWhiteSpace(input.RealName), u => u.RealName.Contains(input.RealName))
            .WhereIF(!string.IsNullOrWhiteSpace(input.Phone), u => u.Phone.Contains(input.Phone))
            .OrderBy(u => u.Order)
            .ToPagedListAsync(input.Page, input.PageSize);
    }

    /// <summary>
    /// 增加用户
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysUser/add")]
    [UnitOfWork]
    public async Task AddUser(AddUserInput input)
    {
        var isExist = await _sysUserRep.IsAnyAsync(u => u.Account == input.Account);
        if (isExist) throw Oops.Oh(ErrorCodeEnum.D1003);

        var user = input.Adapt<SysUser>();
        user.Password = MD5Encryption.Encrypt(CommonConst.SysPassword);
        input.Id = (await _sysUserRep.AsInsertable(user).ExecuteReturnEntityAsync()).Id;

        await UpdateRoleAndExtOrg(input);
    }

    /// <summary>
    /// 更新角色和扩展机构
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    private async Task UpdateRoleAndExtOrg(AddUserInput input)
    {
        await GrantUserRole(new UserRoleInput { UserId = input.Id, RoleIdList = input.RoleIdList });

        await _sysUserExtOrgService.UpdateUserExtOrg(input.Id, input.ExtOrgIdList);
    }

    /// <summary>
    /// 更新用户
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysUser/update")]
    [UnitOfWork]
    public async Task UpdateUser(UpdateUserInput input)
    {
        var isExist = await _sysUserRep.IsAnyAsync(u => u.Account == input.Account && u.Id != input.Id);
        if (isExist) throw Oops.Oh(ErrorCodeEnum.D1003);

        await _sysUserRep.AsUpdateable(input.Adapt<SysUser>()).IgnoreColumns(true)
            .IgnoreColumns(u => new { u.AccountType, u.Password, u.Status }).ExecuteCommandAsync();

        await UpdateRoleAndExtOrg(input);
    }

    /// <summary>
    /// 删除用户
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysUser/delete")]
    [UnitOfWork]
    public async Task DeleteUser(DeleteUserInput input)
    {
        var user = await _sysUserRep.GetFirstAsync(u => u.Id == input.Id);
        if (user == null)
            throw Oops.Oh(ErrorCodeEnum.D1002);
        if (user.AccountType == AccountTypeEnum.SuperAdmin)
            throw Oops.Oh(ErrorCodeEnum.D1014);
        if (user.Id == _userManager.UserId)
            throw Oops.Oh(ErrorCodeEnum.D1001);

        await _sysUserRep.DeleteAsync(user);

        // 删除用户角色
        await _sysUserRoleService.DeleteUserRoleByUserId(input.Id);

        // 删除用户扩展机构
        await _sysUserExtOrgService.DeleteUserExtOrgByUserId(input.Id);
    }

    /// <summary>
    /// 查看用户
    /// </summary>
    /// <returns></returns>
    [HttpGet("/sysUser/detail")]
    public async Task<SysUser> GetUser(long id)
    {
        return await _sysUserRep.GetFirstAsync(u => u.Id == id);
    }

    /// <summary>
    /// 设置用户状态
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysUser/setStatus")]
    public async Task<int> SetUserStatus(UserInput input)
    {
        var user = await _sysUserRep.GetFirstAsync(u => u.Id == input.Id);
        if (user.AccountType == AccountTypeEnum.SuperAdmin)
            throw Oops.Oh(ErrorCodeEnum.D1015);

        if (!Enum.IsDefined(typeof(StatusEnum), input.Status))
            throw Oops.Oh(ErrorCodeEnum.D3005);

        user.Status = input.Status;
        return await _sysUserRep.AsUpdateable(user)
            .UpdateColumns(u => new { u.Status }).ExecuteCommandAsync();
    }

    /// <summary>
    /// 授权用户角色
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysUser/grantRole")]
    public async Task GrantUserRole(UserRoleInput input)
    {
        var user = await _sysUserRep.GetFirstAsync(u => u.Id == input.UserId);
        if (user.AccountType == AccountTypeEnum.SuperAdmin)
            throw Oops.Oh(ErrorCodeEnum.D1022);

        await _sysUserRoleService.GrantUserRole(input);
    }

    /// <summary>
    /// 修改用户密码
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysUser/changeUserPwd")]
    public async Task<int> ChangeUserPwd(ChangePwdInput input)
    {
        var user = await _sysUserRep.GetFirstAsync(u => u.Id == _userManager.UserId);
        if (MD5Encryption.Encrypt(input.PasswordOld) != user.Password)
            throw Oops.Oh(ErrorCodeEnum.D1004);
        user.Password = MD5Encryption.Encrypt(input.PasswordNew);
        return await _sysUserRep.AsUpdateable(user).UpdateColumns(u => u.Password).ExecuteCommandAsync();
    }

    /// <summary>
    /// 重置用户密码
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysUser/resetPwd")]
    public async Task<int> ResetUserPwd(ResetPwdUserInput input)
    {
        var user = await _sysUserRep.GetFirstAsync(u => u.Id == input.Id);
        user.Password = MD5Encryption.Encrypt(CommonConst.SysPassword);
        return await _sysUserRep.AsUpdateable(user).UpdateColumns(u => u.Password).ExecuteCommandAsync();
    }

    /// <summary>
    /// 获取用户拥有角色
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    [HttpGet("/sysUser/ownRole/{userId}")]
    public async Task<List<long>> GetUserOwnRole(long userId)
    {
        return await _sysUserRoleService.GetUserRoleIdList(userId);
    }

    /// <summary>
    /// 获取用户扩展机构
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    [HttpGet("/sysUser/ownOrg/{userId}")]
    public async Task<List<SysUserExtOrg>> GetUserOrgList(long userId)
    {
        return await _sysUserExtOrgService.GetUserExtOrgList(userId);
    }
}