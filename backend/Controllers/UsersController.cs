using System.Security.Claims;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Entities;
using backend.Extensions;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _photoService = photoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await _userRepository.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{username}", Name = "GetUser")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var member = await _userRepository.GetMemberAsync(username.ToLower());

        if (member == null) return NotFound();

        return Ok(member);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUserName());

        _mapper.Map(memberUpdateDto, user);

        _userRepository.Update(user);

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed To Update User");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUserName());

        var result = await _photoService.AddPhotoAsync(file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        if (user.Photos.Count == 0)
        {
            photo.IsMain = true;
        }

        user.Photos.Add(photo);
        if (await _userRepository.SaveAllAsync())
        {
            return CreatedAtRoute("GetUser", new {username = user.UserName}, _mapper.Map<PhotoDto>(photo));
        }

        return BadRequest("Problem Adding Photo");
    }

    [HttpDelete("delete-photo/{id}")]
    public async Task<ActionResult<PhotoDto>> DeletePhoto(int id)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUserName());

        var photo = user.Photos.FirstOrDefault(x => x.Id == id);

        if (photo == null) return NotFound("Couldn't Find The Image!");

        if (photo.IsMain) return BadRequest("Please set another photo as your main!");

        var result = await _photoService.DeletePhtoAsync(photo.PublicId);
        if (result.Error != null) return BadRequest(result.Error.Message);

        user.Photos.Remove(photo);
        if (await _userRepository.SaveAllAsync()) return Ok();

        return BadRequest("Failed to delete photo");
    }

    [HttpPatch("set-main-photo/{id}")]
    public async Task<ActionResult<PhotoDto>> SetMainPhoto(int id)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUserName());

        var photo = user.Photos.FirstOrDefault(x => x.Id == id);

        if (photo == null) return BadRequest("Couldn't Find The Image!");

        if (photo.IsMain) return BadRequest("Photo already set as your main!");

        var currentMain = user.Photos.FirstOrDefault(x => x.IsMain == true);
        if (currentMain != null) currentMain.IsMain = false;

        photo.IsMain = true;

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to set main photo!");
    }
}