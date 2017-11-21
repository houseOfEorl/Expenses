using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EmailService.Tests
{
    [TestClass]
    public class EmailTest
    {
        [TestMethod]
        public void Get_Emails_From_ScotiaBank()
        {
            Email bank = new Email();
            bank.GetEmails();
        }
    }
}
