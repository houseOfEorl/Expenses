using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CorreiosService
{
    public class CallCorreios
    {
        enum tipoEnvio
        {
            SEDEX = 40010,
            PAC = 41106
        };

        public static string Call(string CEP)
        {

            System.ServiceModel.BasicHttpBinding binding = new System.ServiceModel.BasicHttpBinding();

            System.ServiceModel.EndpointAddress address = new System.ServiceModel.EndpointAddress("http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx");

            CorreiosServiceReference.CalcPrecoPrazoWSSoapClient client = new CorreiosServiceReference.CalcPrecoPrazoWSSoapClient(binding, address);

            Task<CorreiosServiceReference.cResultado> result = client.CalcPrecoPrazoAsync(null, null, "40010,41106", "05043020", CEP, "1", 1, 16, 16, 16, 0, "N", 0, "N");

            var foo = result.Result.Servicos;

            string msgFinal = "Olá. O envio ";
            for (int i = 0; i < result.Result.Servicos.Length; i++)
            {
                msgFinal = msgFinal + "via " + Enum.GetName(typeof(tipoEnvio), result.Result.Servicos[i].Codigo) + " fica por R$" + result.Result.Servicos[i].Valor + " (prazo ate " + (Convert.ToInt32(result.Result.Servicos[i].PrazoEntrega) + 2) + " dias úteis) ";
            }

            msgFinal = msgFinal + ". Obrigada.";

            return msgFinal;
        }
    }
}
