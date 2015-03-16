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
    [Authorize]
    [RoutePrefix("api/Budget")]
    public class BudgetController : ApiController, IBudgetDataAccess
    {
        private IBudgetDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<IBudgetDataAccess>();
        [HttpGet]
        [Route("GetBudget")]
        public async Task<IEnumerable<BudgetItem>> GetBudgetItemsForHousehold(int HouseholdId)
        {
            return await i.GetBudgetItemsForHousehold(HouseholdId);
        }
        [HttpPost]
        [Route("Delete")]
        public async Task<bool> DeleteBudgetItemAsync(int id)
        {
            return await i.DeleteBudgetItemAsync(id);
        }
        [HttpPost]
        [Route("Create")]
        public async Task<bool> CreateBudgetItemAsync(string description, int categoryId, int householdId, decimal amount, int frequency)
        {
            return await i.CreateBudgetItemAsync(description, categoryId, householdId, amount, frequency);
        }
        [HttpPost]
        [Route("Update")]
        public async Task<int> UpdateBudgetItemAsync(string description, int categoryId, int householdId, decimal amount, int? frequency)
        {
            return await i.UpdateBudgetItemAsync(description, categoryId, householdId, amount, frequency);
        }
    }
}
