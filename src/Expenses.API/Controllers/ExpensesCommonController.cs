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
    public class ExpensesCommonController : Controller
    {
        private IExpensesRepository _repository;

        #region Constructor
        public ExpensesCommonController(IExpensesRepository repository)
        {
            _repository = repository;
        }
        #endregion

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [Route("api/[controller]/GetAvarageAmount")]
        [HttpGet]
        public IActionResult GetAvarageAmount()
        {
            try
            {
                var amount = _repository.GetAvarageAmountByCountry(1);

                return Ok(amount);
                //return Ok("{value:'a'}");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
