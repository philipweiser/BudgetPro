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

namespace BudgetPro.Controllers
{
    [RoutePrefix("api/Budget")]
    public class BudgetController : ApiController, IBudgetDataAccess
    {
        private IBudgetDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<IBudgetDataAccess>();
        [HttpPost]
        [Route("GetBudget")]
        public async Task<IEnumerable<BudgetItem>> GetBudgetItemsForHousehold([FromBody]int HouseholdId)
        {
            return await i.GetBudgetItemsForHousehold(Convert.ToInt32(User.Identity.GetHouseholdId()));
        }
        [HttpPost]
        [Route("Delete")]
        public async Task<bool> DeleteBudgetItemAsync(int id)
        {
            return await i.DeleteBudgetItemAsync(id);
        }
        [HttpPost]
        [Route("Create")]
        public async Task<bool> CreateBudgetItemAsync(BudgetItem foo)
        {
            return await i.CreateBudgetItemAsync(foo);
        }
        [HttpPost]
        [Route("Update")]
        public async Task<int> UpdateBudgetItemAsync(BudgetItem foo)
        {
            return await i.UpdateBudgetItemAsync(foo);
        }
    }
}
