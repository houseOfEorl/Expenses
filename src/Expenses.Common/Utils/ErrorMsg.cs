using System;
using System.Collections.Generic;
using System.Text;

namespace Expenses.Common.Utils
{
    public class ErrorMsg
    {
        public static string ReturErrorMsgWithClassAndMethodName(string className, string methodName, string errMsg)
        {
            var msg = "ClassName: " + className + " MethodName: " + methodName + Environment.NewLine +  "Error: " + errMsg;
            return msg;
        }
    }
}
