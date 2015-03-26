using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using System.Configuration;
using Insight.Database;
using BudgetPro.Models;
using System.Threading.Tasks;
using BudgetPro.Models.Database;
using System.Data.SqlClient;
using System.Data.Common;
using System.Security.Claims;

namespace BudgetPro.Controllers
{
    [RoutePrefix("api/Household")]
    public class HouseholdController : ApiController
    {
        private IHouseholdDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<IHouseholdDataAccess>();
        // GET: api/Household
        [HttpGet]
        [Route("CanJoin")]
        public async Task<int?> CanJoin()
        {
            var email = (await i.SelectUserAsync(User.Identity.GetUserId<int>())).Email;
            return await i.GetInvitationForUser(email);
        }
        [HttpGet]
        [Route("GetMembers")]
        public async Task<List<UserModel>> GetHouseholdMembers()
        {
            var id = User.Identity.GetUserId<int>();
            return (await i.GetHouseholdMembersAsync(id)).Select(u=>(UserModel)u).ToList();
        }
        [HttpGet]
        [Route("Join")]
        public async Task<int> JoinHousehold()
        {
            var toUserId = User.Identity.GetUserId<int>();
            var email = (await i.SelectUserAsync(toUserId)).Email;
            var invitation = await i.GetInvitationForUser(email);
            var user = await i.SelectUserAsync(toUserId);
            user.HouseholdId = invitation;
            return await i.UpdateUser(user);
        }
        [HttpPost]
        [Route("Leave")]
        public async void DeleteHouseholdAsync()
        {
            var id = User.Identity.GetUserId<int>();
            var users = await i.GetHouseholdMembersAsync(id);
            var user = users.Single(u => u.Id == id);
            if (users.Count() == 1)
            {
                i.DeleteHouseholdAsync(id);
            }
            else
            {
                user.HouseholdId = null;
                await i.UpdateUser(user);
            }
        }
        [HttpPost]
        [Route("Create")]
        public async Task<int?> InsertHouseholdAsync([FromBody]string name)
        {
            int userId = User.Identity.GetUserId<int>();
            var user = await i.SelectUserAsync(userId);
            if (user.HouseholdId == null)
            {
                var foo = await i.InsertHouseholdAsync(name, userId);
                return foo;
            }
            else
            {
                return -2; // user already has a household
            }
        }
        public Task<IList<UserClaim>> GetUserClaimsAsync(int userId)
        {
            return i.GetUserClaimsAsync(userId);
        }
        public Task InsertUserClaimAsync(UserClaim claim)
        {
            return i.InsertUserClaimAsync(claim);
        }

        [HttpPost]
        [Route("Update")]
        public void UpdateHouseholdAsync([FromBody]string name)
        {
            i.UpdateHouseholdAsync(name);
        }
        // POST: api/Household/Invite
        [HttpPost]
        [Route("Invite")]
        public Task<int> InsertInvitationAsync([FromBody]string Email)
        {
            return i.InsertInvitationAsync(User.Identity.GetUserId<int>(), Email);
        }

    }
}
