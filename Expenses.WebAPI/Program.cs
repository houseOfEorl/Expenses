using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace Expenses.WebAPI
{
    public class Program
    {
        //public static void Main(string[] args)
        //{
        //    var host = new WebHostBuilder()
        //        .UseKestrel()
        //        .UseContentRoot(Directory.GetCurrentDirectory())
        //        .UseIISIntegration()
        //        .UseStartup<Startup>()
        //        //.UseApplicationInsights()
        //        .Build();

        //    host.Run();
        //}
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
            .UseKestrel()
            .UseContentRoot(System.IO.Directory.GetCurrentDirectory())
            .UseStartup<Startup>()
            .UseUrls("http://localhost:5050")
            .UseIISIntegration()
            .Build();

            host.Run();
        }
    }
}
