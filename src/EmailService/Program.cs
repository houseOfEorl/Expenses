using System;

namespace EmailService
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Load Gmail");
            Email bank = new Email();
            bank.GetEmails();
        }
    }
}