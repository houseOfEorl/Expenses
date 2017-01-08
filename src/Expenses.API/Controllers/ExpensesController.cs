using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Expenses.DAL;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    public class ExpensesController : Controller
    {
        private IExpensesRepository _repository;

        #region Constructor
        public ExpensesController(IExpensesRepository repository)
        {
            _repository = repository;
        }
        #endregion

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var expenses = _repository.GetExpensesByPeriod(Convert.ToDateTime("2016-11-01"));

                //string json = JsonConvert.SerializeObject(expenses);

                return Ok(JsonConvert.SerializeObject(expenses));
                //return Ok("{value:'a'}");
            }
            catch (Exception ex)
            {
                return BadRequest("Erorr occurrred");
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "a";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
