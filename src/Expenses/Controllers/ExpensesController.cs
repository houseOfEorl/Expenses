using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Expenses.Helpers;
using System.Net.Http;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Expenses.Controllers
{
    public class ExpensesController : Controller
    {
        // GET: /<controller>/
        public async Task<ActionResult> Index()
        {

            //var client = ExpensesHttpClient.GetClient();

            //HttpResponseMessage response = await client.GetAsync("Expenses");

            //string content = await response.Content.ReadAsStringAsync();
            //var model = JsonConvert.DeserializeObject<dynamic>(content);

            //return View(content);
            return View();
        }
    }
}
