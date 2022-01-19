using backend.Entities;

namespace backend.Interfaces;

public interface ITokenService
{
    public string CreateToken(AppUser user);
}