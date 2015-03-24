using System.Collections.Generic;
using System.Threading.Tasks;
using BudgetPro.Models;
using Insight.Database;

namespace BudgetPro.Models.Database
{
    [Sql(Schema = "dbo")]
    public interface IBudgetDataAccess
    {
        // user defined procs
        Task<IEnumerable<BudgetItem>> GetBudgetItemsByHousehold(int HouseholdId);

        // auto procs
        Task DeleteBudgetItemAsync(int id);
        Task<int> InsertBudgetItemAsync(BudgetItem foo);
        Task<int> UpdateBudgetItemAsync(BudgetItem foo);

        [Sql(Schema = "Security")]
        Task<UserModel> SelectUserAsync(int Id);
    }
}