using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class UsersController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}