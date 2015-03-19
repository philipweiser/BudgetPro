using BudgetPro.Models;
using BudgetPro.Models.Database;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Insight.Database;
using Microsoft.AspNet.Identity;

namespace BudgetPro.Controllers
{
    [RoutePrefix("api/Budget")]
    public class BudgetController : ApiController
    {
        private IBudgetDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<IBudgetDataAccess>();
        
        [HttpGet]
        [Route("GetBudget")]
        public async Task<IEnumerable<BudgetItem>> GetBudgetItemsForHousehold()
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());

            if (user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            return await i.FindBudgetItems(user.HouseholdId.Value);
        }
        [HttpPost]
        [Route("Delete")]
        public Task DeleteBudgetItemAsync([FromBody]int id)
        {
            return i.DeleteBudgetItemAsync(id);
        }
        [HttpPost]
        [Route("Create")]
        public async Task<int> CreateBudgetItemAsync(BudgetItem foo)
        {
            return await i.InsertBudgetItemAsync(foo);
        }
        [HttpPost]
        [Route("Update")]
        public async Task<int> UpdateBudgetItemAsync(BudgetItem foo)
        {
            return await i.UpdateBudgetItemAsync(foo);
        }
    }
}
