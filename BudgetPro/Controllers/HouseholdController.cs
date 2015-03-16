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
        public async Task<int> InsertHouseholdAsync([FromBody]string name)
        {
            return await i.InsertHouseholdAsync(name);
        }
        [HttpPost]
        [Route("Update")]
        public async Task<int> UpdateHouseholdAsync([FromBody]string name)
        {
            return await i.UpdateHouseholdAsync(name);
        }
        // POST: api/Household/Invite
        [HttpPost]
        [Route("Invite")]
        public Task Invite([FromBody]string Email)
        {
            var conn = ConfigurationManager.ConnectionStrings["DefaultConnection"];
            object foo = new { FromUserId = User.Identity.GetUserId(), ToEmail = Email};
            return conn.Connection().ExecuteAsync("InsertInvitationAsync", foo);
        }
        
    }
}
