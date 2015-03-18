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
    [Authorize]
    [RoutePrefix("api/Bank")]
    public class BankController : ApiController
    {
        private IBankDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<IBankDataAccess>();
        [HttpPost]
        [Route("Create")]
        public async Task CreateBankAsync(BankModel foo)
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());
            
            if(user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            foo.HouseholdId = user.HouseholdId.Value;
            i.InsertAccountAsync(foo);
        }
        [HttpGet]
        [Route("GetBanks")]
        public async Task<List<BankModel>> GetAccounts()
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());

            if (user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            return await i.GetAccountsAsync(user.HouseholdId.Value);
        }
        [HttpPost]
        [Route("Delete")]
        public Task DeleteBankAsync(int id)
        {
            return Task.FromResult(i.DeleteAccountAsync(id));
        }
        [HttpPost]
        [Route("Edit")]
        public Task UpdateBankAsync(BankModel entry)
        {
            return i.UpdateAccountAsync(entry);
        }

    }
}
