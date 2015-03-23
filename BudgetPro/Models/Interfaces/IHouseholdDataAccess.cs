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
        Task<IEnumerable<UserModel>> GetHouseholdMembersAsync(int userId);
        

        // auto procs
        Task<int> UpdateHouseholdAsync(string Name);
        Task<int?> InsertHouseholdAsync(string Name, int userId);
        Task<int> InsertInvitationAsync(int FromUserId, string ToEmail);
        void DeleteHouseholdAsync(int Id);

        [Sql(Schema="Security")]
        Task<IList<UserClaim>> GetUserClaimsAsync(int userId);
        [Sql(Schema = "Security")]
        Task InsertUserClaimAsync(UserClaim claim);
        [Sql(Schema = "Security")]
        Task<ApplicationUser> SelectUserAsync(int Id);
    }
    //var x = new Household { Name = "Charly" };
    //db.InsertHouseholdAsync(x)
    //x.Id == ?

    //var newId = await InsertHouseholdAsync( "Charly" );
    //user.HouseholdId = newId;
}