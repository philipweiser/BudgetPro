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
    public class TransactionController : ApiController, ITransactionDataAccess
    {
        private ITransactionDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<ITransactionDataAccess>();
        public async Task<int> InsertTransactionAsync(int HouseholdId, string Name, decimal balance)
        {
            return await i.InsertTransactionAsync(HouseholdId, Name, balance);
        }
        public async Task<bool> GetTransactionsAsync(int HouseholdId)
        {
            return await i.GetTransactionsAsync(HouseholdId);
        }
        public async Task<bool> DeleteTransactionAsync(int id) 
        {
            return await i.DeleteTransactionAsync(id);
        }
        public async Task<int> UpdateTransactionAsync(int HouseholdId, string Name, string description, decimal balance, decimal reconciledBalance, int updaterId, DateTimeOffset updated)
        {
            return await i.UpdateTransactionAsync(HouseholdId, Name, description, balance, reconciledBalance, updaterId, DateTimeOffset.Now);
        }
    }
}
