using System.Collections.Generic;
using System.Threading.Tasks;
using BudgetPro.Models;
using Insight.Database;
using System;

namespace BudgetPro.Models.Database
{
    [Sql(Schema = "dbo")]
    public interface ITransactionDataAccess
    {
        // user defined procs

        // auto procs
        Task<int> InsertTransactionAsync(int HouseholdId, string Name, decimal balance);
        Task<bool> GetTransactionsAsync(int HouseholdId);
        Task<bool> DeleteTransactionAsync(int id);
        Task<int> UpdateTransactionAsync(int HouseholdId, string Name, string description, decimal balance, decimal reconciledBalance, int updaterId, DateTimeOffset updated);
    }
}