using System;
using System.Threading.Tasks;

namespace CorreiosService
{
    class Program
    {
        enum tipoEnvio
        {
            SEDEX = 40010,
            PAC = 41106
        };

        static void Main(string[] args)
        {

            string msgFinal = CallCorreios.Call("05043020");

            Console.Write("People Returned:" + msgFinal);
           

            Console.ReadLine();
        }
    }
}
