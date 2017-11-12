using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace Expenses.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {

        private ILogger<ValuesController> _logger;

        public ValuesController(ILogger<ValuesController> logger)
        {
            _logger = logger;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            //_logger.LogError("test");
            //throw new Exception("Horsed");
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [Authorize("Bearer")]
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
    }
}
