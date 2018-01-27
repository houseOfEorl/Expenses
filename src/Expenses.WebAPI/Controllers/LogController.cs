using Expenses.Common.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Reflection;

namespace Expenses.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class LogController : Controller
    {
        private readonly ILogger<LogController> _logger;

        public LogController(ILogger<LogController> logger)
        {
            _logger = logger;
        }

		[HttpGet]
        public IActionResult TestLog()
        {
            try
            {
                _logger.LogError(ErrorMsg.ReturErrorMsgWithClassAndMethodName(this.GetType().FullName, MethodBase.GetCurrentMethod().Name, "Test"));

                return Ok("ok");
            }
            catch (Exception ex)
            {
                return BadRequest("Erorr occurrred" + ex.Message);
            }
        }
    }
}