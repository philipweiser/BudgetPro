using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace BudgetPro.Models
{
    public static class Extensions
    {
        public static int? GetHouseholdId(this IIdentity Identity)
        {
            if (Identity.IsAuthenticated)
            {
                ClaimsIdentity claimsIdentity = Identity as ClaimsIdentity;
                foreach (var claim in claimsIdentity.Claims)
                {
                    if (claim.Type == "Household")
                        return Int32.Parse(claim.Value);
                }
                return null;
            }
            else
                return null;
        }

        public static string GetEmail(this IIdentity Identity)
        {
            if (Identity.IsAuthenticated)
            {
                ClaimsIdentity claimsIdentity = Identity as ClaimsIdentity;
                foreach (var claim in claimsIdentity.Claims)
                {
                    if (claim.Type == ClaimTypes.Email)
                        return claim.Value;
                }
                return "";
            }
            else
                return "";
        }
    }
}