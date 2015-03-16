using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BudgetPro.Controllers
{
    [Authorize]
    [RoutePrefix("api/Dashboard")]
    public class DashboardController : ApiController
    {
        // GET: api/Bank
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Bank/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Bank
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Bank/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Bank/5
        public void Delete(int id)
        {
        }
    }
}
