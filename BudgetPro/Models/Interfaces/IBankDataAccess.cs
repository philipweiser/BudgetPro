using System.Collections.Generic;
using System.Threading.Tasks;
using BudgetPro.Models;
using Insight.Database;
namespace BudgetPro.Models.Database
{
    [Sql(Schema = "dbo")]
    public interface IBankDataAccess
    {
        // user defined procs
        Task InsertAccountAsync(BankModel entry);

        // auto procs
        Task<List<BankModel>> FindAccountsAsync(int HouseholdId);
        Task DeleteAccountAsync(int id);
        Task<int> UpdateAccountAsync(BankModel entry);

        [Sql(Schema = "Security")]
        Task<UserModel> SelectUserAsync(int Id);
    }
}