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
        Task<IEnumerable<BudgetItem>> GetBudgetItemsForHousehold(int HouseholdId);

        // auto procs
        Task<bool> DeleteBudgetItemAsync(int id);
        Task<bool> CreateBudgetItemAsync(string description, int categoryId, int householdId, decimal amount, int frequency);
        Task<int> UpdateBudgetItemAsync(string description, int categoryId, int householdId, decimal amount, int? frequency);
    }
}