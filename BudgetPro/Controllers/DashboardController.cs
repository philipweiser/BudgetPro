﻿using BudgetPro.Models;
using BudgetPro.Models.Database;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Insight.Database;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace BudgetPro.Controllers
{
    [Authorize]
    [RoutePrefix("api/Dashboard")]
    public class DashboardController : ApiController
    {
        private IDashDataAccess i = ConfigurationManager.ConnectionStrings["DefaultConnection"].As<IDashDataAccess>();
        //GET
        [Route("GetDashboard")]
        [HttpGet]
        public async Task<DashModel> GetDashboard()
        {
            var user = await i.SelectUserAsync(User.Identity.GetUserId<int>());
            DashModel model = new DashModel();
            if (user.HouseholdId != null)
            {
            model.HouseholdId = user.HouseholdId.Value;
            model.MyAccounts = await i.FindAccountsAsync(user.HouseholdId.Value);
            model.RecentTransactions = await i.GetRecentTransactionsAsync(user.HouseholdId.Value);
            model.MyGraph = await i.GetGraphData(user.HouseholdId.Value);
            return model;
            }
            else
            {
                return model;
            }
        }
    }
}
