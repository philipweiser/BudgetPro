using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using System.Configuration;
using Insight.Database;
using BudgetPro.Models;
using System.Threading.Tasks;
using BudgetPro.Models.Database;
using System.Data.SqlClient;
using System.Data.Common;

namespace BudgetPro.Controllers
{
    [Authorize]
    [RoutePrefix("api/Category")]
    public class CategoryController : ApiController
    {
        private ICategoryDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<ICategoryDataAccess>();
        [HttpPost]
        [Route("Create")]
        public async Task<int> CreateCategoryAsync(CategoryModel entry)
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());
            
            if(user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            entry.HouseholdId = user.HouseholdId.Value;
            return await i.InsertCategoryAsync(entry);
        }
        [HttpGet]
        [Route("GetCategories")]
        public async Task<List<CategoryModel>> GetCategories()
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());

            if (user == null || user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            return (await i.GetCategoriesByHousehold(user.HouseholdId.Value)).OrderBy(t => t.Name).ToList();
        }
        [HttpPost]
        [Route("Delete")]
        public Task DeleteCategoryAsync([FromBody]int id)
        {
            return i.DeleteCategoryAsync(id);
        }
        [HttpPost]
        [Route("Edit")]
        public async Task<int> UpdateCategoryAsync(CategoryModel entry)
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());

            if (user.HouseholdId == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            entry.HouseholdId = user.HouseholdId.Value;
            return await i.UpdateCategoryAsync(entry);
        }

    }
}
