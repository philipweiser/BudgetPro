using System.Collections.Generic;
using System.Threading.Tasks;
using BudgetPro.Models;
using Insight.Database;
namespace BudgetPro.Models.Database
{
    [Sql(Schema = "dbo")]
    public interface IDashDataAccess
    {
        // user defined procs
        Task<int> InsertAccountAsync(BankModel entry);
        Task<IEnumerable<BudgetItem>> GetBudgetItemsByHousehold(int HouseholdId);
        // auto procs
        Task<List<BankModel>> FindAccountsAsync(int HouseholdId);
        Task DeleteAccountAsync(int id);
        Task<int> UpdateAccountAsync(BankModel entry);

        [Sql(Schema = "Security")]
        Task<UserModel> SelectUserAsync(int Id);

        Task<DashModel> GetDashModel(int Id);

        Task<List<TransModel>> GetRecentTransactionsAsync(int HouseholdId);

        Task<List<object>> GetGraphData(int HouseholdId);
    }
}