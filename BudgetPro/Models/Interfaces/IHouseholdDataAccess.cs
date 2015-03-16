using System.Collections.Generic;
using System.Threading.Tasks;
using BudgetPro.Models;
using Insight.Database;

namespace BudgetPro.Models.Database
{
    [Sql(Schema = "dbo")]
    public interface IHouseholdDataAccess
    {
        // user defined procs
        //Task GetHouseholdAsync(int id);

        // auto procs
        Task<int> UpdateHouseholdAsync(string Name);
        Task<int> InsertHouseholdAsync(string Name);
    }
    //var x = new Household { Name = "Charly" };
    //db.InsertHouseholdAsync(x)
    //x.Id == ?

    //var newId = await InsertHouseholdAsync( "Charly" );
    //user.HouseholdId = newId;
}