using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class RegisterDto
{
    [Required] public string UserName { get; set; }
    [Required] public string Password { get; set; }

    [Required, Timestamp] public DateTime DateOfBirth { get; set; }

    [Required] public string Gender { get; set; }

    [Required] public string Introduction { get; set; }

    [Required] public string LookingFor { get; set; }

    [Required] public string Interests { get; set; }

    [Required] public string City { get; set; }

    [Required] public string Country { get; set; }

    [Required] public string KnownAs { get; set; }
}