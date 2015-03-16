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
    public class BankController : ApiController, IBankDataAccess
    {
        private IBankDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<IBankDataAccess>();
        public Task CreateBankAsync(int HouseholdId, string Name, decimal balance)
        {
            return Task.FromResult(i.CreateBankAsync(HouseholdId, Name, balance));
        }
        public Task GetAccounts(int HouseholdId)
        {
            return Task.FromResult(i.GetAccounts(HouseholdId));
        }
        public Task DeleteBankAsync(int id)
        {
            return Task.FromResult(i.DeleteBankAsync(id));
        }

    }
}
