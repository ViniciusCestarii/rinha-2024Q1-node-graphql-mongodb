import "dotenv/config"; // Load environment variables
import { Cliente, Transacao } from "./schemas";
import mongoose from "./db";

const reset = async () => {

  await Cliente.deleteMany({})
  await Transacao.deleteMany({})

  const newClients = [
    { clientId: 1, nome: 'o barato sai caro', limite: 1000 * 100 },
    { clientId: 2, nome: 'zan corp ltda', limite: 800 * 100 },
    { clientId: 3, nome: 'les cruders', limite: 10000 * 100 },
    { clientId: 4, nome: 'padaria joia de cocaia', limite: 100000 * 100 },
    { clientId: 5, nome: 'kid mais', limite: 5000 * 100 },
  ];

  await Cliente.insertMany(newClients)

  console.log('Collection reset. New clients added.');
  mongoose.disconnect();
}

reset().then(() => {
  console.log('Reset complete');
}).catch((error) => {
  console.error('Error resetting collection:', error);
});