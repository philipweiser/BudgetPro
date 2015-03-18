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
    public class HouseholdController : ApiController, IHouseholdDataAccess
    {
        private IHouseholdDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<IHouseholdDataAccess>();
        //// GET: api/Household
        //public async Task<IEnumerable<UserModel>> GetMembers()
        //{
        //    var email = User.Identity.GetEmail();
        //    return await database.Connection().QueryAsync<UserModel>("Security.FindUsers", new { HouseHoldId = "0" });
        //}
        //[HttpPost]
        //public Task GetHouseholdAsync(int id)
        //{
        //    return new NotImplementedException();
        //}
        [HttpPost]
        [Route("Create")]
        public async Task<int?> InsertHouseholdAsync([FromBody]string name)
        {
            List<UserClaim> claims = (await GetUserClaimsAsync(Convert.ToInt32(User.Identity.GetUserId()))).ToList();
            foreach (UserClaim c in claims)
            {
                if (c.ClaimType == "Household" && c.ClaimValue == "")
                {
                    // if there is a household claim, check if it is empty. if so, create a claim
                    var asdf = User.Identity.GetHouseholdId();
                    var data = await i.InsertHouseholdAsync(name);

                    var theClaim = new UserClaim();
                    theClaim.UserId = Convert.ToInt32(User.Identity.GetUserId());
                    theClaim.ClaimType = "Household";
                    theClaim.ClaimValue = data.ToString();

                    var resultClaim = InsertUserClaimAsync(theClaim);
                    return data;
                }
            }          
            
            return null;
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
        public Task Invite([FromBody]string Email)
        {
            var conn = ConfigurationManager.ConnectionStrings["DefaultConnection"];
            object foo = new { FromUserId = User.Identity.GetUserId(), ToEmail = Email };
            return conn.Connection().ExecuteAsync("InsertInvitationAsync", foo);
        }

    }
}
