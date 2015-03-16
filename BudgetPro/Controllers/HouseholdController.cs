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

namespace BudgetPro.Controllers
{
    [RoutePrefix("api/Household")]
    public class HouseholdController : ApiController
    {
        private ConnectionStringSettings database = ConfigurationManager.ConnectionStrings["DefaultConnection"];
        
        // GET: api/Household
        public async Task<IEnumerable<UserModel>> GetMembers()
        {
            var email = User.Identity.GetEmail();
            return await database.Connection().QueryAsync<UserModel>("Security.FindUsers", new { HouseHoldId = "0" });
        }

        // GET: api/Household/5
        public string Get(int id)
        {
            return "value";
        }
        // POST: api/Household/Invite
        [HttpPost]
        [Route("Invite")]
        public string Invite([FromBody]string Email)
        {
            return Email + "was invited to join your house.";
        }
        // PUT: api/Household/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Household/5
        public void Delete(int id)
        {
        }
    }
}
