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
        Task CreateBankAsync(int HouseholdId, string Name, decimal balance);

        // auto procs
        Task GetAccounts(int HouseholdId);
        Task DeleteBankAsync(int id);
    }
}