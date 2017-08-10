using System;

namespace EmailService
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Load Gmail");
            Bank bank = new Bank();
            bank.getEmails();
        }
    }
}