using System.Collections.Generic;
using System.Threading.Tasks;
using BudgetPro.Models;
using Insight.Database;
namespace BudgetPro.Models.Database
{
    [Sql(Schema = "dbo")]
    public interface ICategoryDataAccess
    {
        // user defined procs
        Task<int> InsertCategoryAsync(CategoryModel entry);

        // auto procs
        Task<List<CategoryModel>> FindCategoriesAsync(int HouseholdId);
        Task DeleteCategoryAsync(int Id);
        Task<int> UpdateCategoryAsync(CategoryModel entry);

        [Sql(Schema = "Security")]
        Task<UserModel> SelectUserAsync(int Id);
    }
}