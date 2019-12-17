using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  //позволяет обращаться без авторизации
  [AllowAnonymous]
  public class UserController : BaseController
  {
    [HttpPost("login")]
    public async Task<ActionResult<User>> Login(Login.Query query)
    {
      var User = await Mediator.Send(query);
      return User;
    }


    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(Register.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<User>> CurrentUser()
    {
      return await Mediator.Send(new CurrentUser.Query());
    }
  }
}