using System.Linq;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class FollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool>
  {
    private readonly DataContext _context;
    private readonly IUserAccessor _accessor;

    public FollowingResolver(DataContext context, IUserAccessor accessor)
    {
      _context = context;
      _accessor = accessor;
    }

    public bool Resolve(UserActivity source, AttendeeDto destination, bool destMember, ResolutionContext context)
    {
      var currentUser = _context.Users.SingleOrDefaultAsync(x => x.UserName == _accessor.GetCurrentUsername()).Result;

      if (currentUser.Followings.Any(x => x.TargetId == source.AppUserId))
        return true;

      return false;
    }
  }
}