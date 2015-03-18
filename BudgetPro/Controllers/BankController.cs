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
        public Task CreateBankAsync(string Name, decimal balance)
        {
            UserModel user = new UserModel();
            user.Id = User.Identity.GetUserId<int>();
            i.SelectUserAsync(user.Id);
            return i.CreateBankAsync(user.HouseholdId, Name, balance, balance);
        }
        [HttpGet]
        [Route("GetBanks")]
        public Task GetAccounts(int HouseholdId)
        {
            return Task.FromResult(i.GetAccounts(HouseholdId));
        }
        [HttpPost]
        [Route("Delete")]
        public Task DeleteBankAsync(int id)
        {
            return Task.FromResult(i.DeleteBankAsync(id));
        }
        [HttpPost]
        [Route("Edit")]
        public Task UpdateBankAsync(int Id, string Name, decimal Balance, decimal ReconciledBalance)
        {
            UserModel user = new UserModel();
            user.Id = User.Identity.GetUserId<int>();
            i.SelectUserAsync(user.Id);
            return i.UpdateAccountAsync(Id, user.HouseholdId, Name, Balance, ReconciledBalance);
        }

    }
}
