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
        [Route("Create")]
        public async Task<int> InsertTransactionAsync(TransModel foo)
        {
            // get household Id
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());
            if (user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            // populate new categorymodel
            CategoryModel entry = new CategoryModel();
            entry.HouseholdId = user.HouseholdId.Value;
            entry.Name = foo.CategoryName;
            // create new category
            if (foo.CategoryId == 0)
            {
                ICategoryDataAccess ic = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<ICategoryDataAccess>();
                foo.CategoryId = await ic.InsertCategoryAsync(entry);
            }
            foo.UpdatedByUserId = user.Id;
            foo.Date = DateTimeOffset.Now;
            return await i.InsertTransactionAsync(foo);
        }
        [HttpPost]
        [Route("GetTransactions")]
        public async Task<List<TransModel>> GetTransactionsAsync([FromBody]int AccountId)
        {            
            return await i.GetTransactionsByAccountAsync(AccountId);
        }
        [HttpPost]
        [Route("Delete")]
        public Task DeleteTransactionAsync([FromBody]int id) 
        {
            return i.DeleteTransactionAsync(id);
        }
        [HttpPost]
        [Route("Update")]
        public async Task<int> UpdateTransactionAsync(TransModel foo)
        {

            if (foo.CategoryId == 0)
            {            
                // get household Id
                var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());
                if (user.HouseholdId == null)
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                // populate new categorymodel
                CategoryModel entry = new CategoryModel();
                entry.HouseholdId = user.HouseholdId.Value;
                entry.Name = foo.CategoryName;
                // create new category
                ICategoryDataAccess ic = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<ICategoryDataAccess>();
                foo.CategoryId = await ic.InsertCategoryAsync(entry);
            }

            foo.UpdatedByUserId = User.Identity.GetUserId<int>();
            foo.Updated = DateTimeOffset.Now;
            return await i.UpdateTransactionAsync(foo);
        }
    }
}
