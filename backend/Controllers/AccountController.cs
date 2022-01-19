using System.Security.Cryptography;
using System.Text;
using backend.Data;
using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context;

    public AccountController(DataContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.UserName)) return BadRequest("Username already in use!");
        
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = registerDto.UserName.ToLower(),
            Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(user => user.UserName == loginDto.UserName.ToLower());

        if (user == null) return Unauthorized("Invalid Credentials");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        
        var isMatchedPassword = user.Password.SequenceEqual(hashedPassword);

        if (!isMatchedPassword) return Unauthorized("Invalid Credentials");
        
        return user;
    }

    private async Task<bool> UserExists(string username)
    {
        return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
    }

}