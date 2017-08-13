using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Expenses.DAL;
using Newtonsoft.Json;
using Expenses.DAL.Entities;

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
        [HttpGet("{date}")]
        public IActionResult Get(string date)
        {
            try
            {
                DateTime today = DateTime.Today;

                DateTime.TryParse(date, out today);
                //DateTime dt = Convert.ToDateTime(date);

                var expenses = _repository.GetExpensesByPeriod(today);

                //string json = JsonConvert.SerializeObject(expenses);

                return Ok(JsonConvert.SerializeObject(expenses));
                //return Ok("{value:'a'}");
            }
            catch (Exception ex)
            {
                return BadRequest("Erorr occurrred" + ex.Message);
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
        public int Post([FromBody]ExpensesEntity value)
        {
            var id = _repository.AddExpense(value);
            return id;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id, [FromBody]ExpensesEntity value)
        {
            //var exp = _repository.GetExpenseById(value.ExpensesID);
            _repository.RemoveExpense(value);
        }
    }
}
