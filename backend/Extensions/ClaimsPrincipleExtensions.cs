using System.Security.Claims;

namespace backend.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static string? GetUserName(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}