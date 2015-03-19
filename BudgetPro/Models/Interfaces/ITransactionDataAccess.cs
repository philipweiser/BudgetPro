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
        Task<int> InsertTransactionAsync(TransModel element);
        Task<List<TransModel>> FindTransactionsAsync(int HouseholdId);
        Task DeleteTransactionAsync(int Id);
        Task<int> UpdateTransactionAsync(TransModel element);

        [Sql(Schema = "Security")]
        Task<UserModel> SelectUserAsync(int Id);
    }
}