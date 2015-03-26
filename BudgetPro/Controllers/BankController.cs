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
        public async Task<int> CreateBankAsync([FromBody]string Name)
        {
            BankModel foo = new BankModel();
            foo.Name = Name;
            foo.Balance = 0;
            foo.ReconciledBalance = 0;
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());
            
            if(user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            foo.HouseholdId = user.HouseholdId.Value;
            return await i.InsertAccountAsync(foo);
        }
        [HttpGet]
        [Route("GetBanks")]
        public async Task<List<BankModel>> GetAccounts()
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());

            if (user.HouseholdId == null)
                return null;

            return await i.FindAccountsAsync(user.HouseholdId.Value);
        }
        [HttpPost]
        [Route("Delete")]
        public Task DeleteBankAsync([FromBody]int id)
        {
            return i.DeleteAccountAsync(id);
        }
        [HttpPost]
        [Route("Edit")]
        public async Task<int> UpdateBankAsync(BankModel entry)
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());

            if (user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            entry.HouseholdId = user.HouseholdId.Value;
            return await i.UpdateAccountAsync(entry);
        }

    }
}
