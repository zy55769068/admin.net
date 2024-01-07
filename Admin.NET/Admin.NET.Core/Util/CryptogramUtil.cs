﻿// 麻省理工学院许可证
//
// 版权所有 (c) 2021-2023 zuohuaijun，大名科技（天津）有限公司  联系电话/微信：18020030720  QQ：515096995
//
// 特此免费授予获得本软件的任何人以处理本软件的权利，但须遵守以下条件：在所有副本或重要部分的软件中必须包括上述版权声明和本许可声明。
//
// 软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、适用性和非侵权的保证。
// 在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是因合同、侵权或其他方式引起的，与软件或其使用或其他交易有关。

namespace Admin.NET.Core;

public class CryptogramUtil
{
    public static readonly bool StrongPassword = App.GetConfig<bool>("Cryptogram:StrongPassword"); // 是否开启密码强度验证
    public static readonly string PasswordStrengthValidation = App.GetConfig<string>("Cryptogram:PasswordStrengthValidation"); // 密码强度验证正则表达式
    public static readonly string PasswordStrengthValidationMsg = App.GetConfig<string>("Cryptogram:PasswordStrengthValidationMsg"); // 密码强度验证提示
    public static readonly string CryptoType = App.GetConfig<string>("Cryptogram:CryptoType"); // 加密类型
    public static readonly string PublicKey = App.GetConfig<string>("Cryptogram:PublicKey"); // 公钥
    public static readonly string PrivateKey = App.GetConfig<string>("Cryptogram:PrivateKey"); // 私钥

	public static readonly string SM4_key = "0123456789abcdeffedcba9876543210";
	public static readonly string SM4_iv = "595298c7c6fd271f0402f804c33d3f66";
	/// <summary>
	/// 加密
	/// </summary>
	/// <param name="plainText"></param>
	/// <returns></returns>
	public static string Encrypt(string plainText)
    {
        if (CryptoType == CryptogramEnum.MD5.ToString())
        {
            return MD5Encryption.Encrypt(plainText);
        }
        else if (CryptoType == CryptogramEnum.SM2.ToString())
        {
            return SM2Encrypt(plainText);
        }
        else if (CryptoType == CryptogramEnum.SM4.ToString())
        {
            return SM4EncryptECB(plainText);
        }
        return plainText;
    }

    /// <summary>
    /// 解密
    /// </summary>
    /// <param name="cipherText"></param>
    /// <returns></returns>
    public static string Decrypt(string cipherText)
    {
        if (CryptoType == CryptogramEnum.SM2.ToString())
        {
            return SM2Decrypt(cipherText);
        }
        else if (CryptoType == CryptogramEnum.SM4.ToString())
        {
            return SM4DecryptECB(cipherText);
        }
        return cipherText;
    }

    /// <summary>
    /// SM2加密
    /// </summary>
    /// <param name="plainText"></param>
    /// <returns></returns>
    public static string SM2Encrypt(string plainText)
    {
        return GMUtil.SM2Encrypt(PublicKey, plainText);
    }

    /// <summary>
    /// SM2解密
    /// </summary>
    /// <param name="cipherText"></param>
    /// <returns></returns>
    public static string SM2Decrypt(string cipherText)
    {
        return GMUtil.SM2Decrypt(PrivateKey, cipherText);
    }

    /// <summary>
    /// SM4加密（ECB）
    /// </summary>
    /// <param name="plainText"></param>
    /// <returns></returns>
    public static string SM4EncryptECB(string plainText)
    {
        return GMUtil.SM4EncryptECB(SM4_key, plainText);
    }

    /// <summary>
    /// SM4解密（ECB）
    /// </summary>
    /// <param name="cipherText"></param>
    /// <returns></returns>
    public static string SM4DecryptECB(string cipherText)
    {
        return GMUtil.SM4DecryptECB(SM4_key, cipherText);
    }

    /// <summary>
    /// SM4加密（CBC）
    /// </summary>
    /// <param name="plainText"></param>
    /// <returns></returns>
    public static string SM4EncryptCBC(string plainText)
    {
        return GMUtil.SM4EncryptCBC(SM4_key, SM4_iv, plainText);
    }

    /// <summary>
    /// SM4解密（CBC）
    /// </summary>
    /// <param name="cipherText"></param>
    /// <returns></returns>
    public static string SM4DecryptCBC(string cipherText)
    {
        return GMUtil.SM4DecryptCBC(SM4_key,SM4_iv, cipherText);
    }
}