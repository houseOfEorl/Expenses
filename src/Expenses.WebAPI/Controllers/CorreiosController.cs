using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CorreiosService;
using Newtonsoft.Json;


namespace Expenses.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class CorreiosController : Controller
    {
        [HttpGet("{cep}")]
        public IActionResult Get(string cep)
        {
            try
            {
                //CallCorreios callCorreios = new CallCorreios();
                string result = CallCorreios.Call(cep);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}