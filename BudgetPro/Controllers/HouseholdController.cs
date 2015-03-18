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
        [Route("GetMembers")]
        public async Task<IEnumerable<UserModel>> GetHouseholdMembers()
        {
            var id = User.Identity.GetUserId<int>();
            return await i.GetHouseholdMembersAsync(id);
        }

        [HttpPost]
        [Route("Leave")]
        public void DeleteHouseholdAsync()
        {
            var id = User.Identity.GetUserId<int>();
            i.DeleteHouseholdAsync(id);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<int?> InsertHouseholdAsync([FromBody]string name)
        {
            int userId = User.Identity.GetUserId<int>();
            var user = new ApplicationUser();
            user.Id = userId;
            i.SelectUserAsync(userId);
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
