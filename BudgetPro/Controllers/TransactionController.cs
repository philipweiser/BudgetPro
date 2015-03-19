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
    [RoutePrefix("api/Transaction")]
    public class TransactionController : ApiController
    {
        private ITransactionDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<ITransactionDataAccess>();
        [HttpPost]
        [Route("")]
        public async Task<int> InsertTransactionAsync(TransModel foo)
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());

            foo.UpdatedByUserId = user.Id;
            foo.Date = DateTimeOffset.Now;
            return await i.InsertTransactionAsync(foo);
        }
        [HttpGet]
        [Route("")]
        public async Task<List<TransModel>> GetTransactionsAsync()
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());

            if (user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            
            return await i.FindTransactionsAsync(user.HouseholdId.Value);
        }
        [HttpPost]
        [Route("")]
        public Task DeleteTransactionAsync(int id) 
        {
            return i.DeleteTransactionAsync(id);
        }
        [HttpPost]
        [Route("")]
        public async Task<int> UpdateTransactionAsync(TransModel foo)
        {
            foo.UpdatedByUserId = User.Identity.GetUserId<int>();
            foo.Updated = DateTimeOffset.Now;
            return await i.UpdateTransactionAsync(foo);
        }
    }
}
