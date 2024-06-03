var conn = new Mongo();
var db = conn.getDB("mongodb");

db.clientes.insertMany([
  { clientId: 1, nome: 'o barato sai caro', limite: 100000, saldo: 0 },
  { clientId: 2, nome: 'zan corp ltda', limite: 80000, saldo: 0 },
  { clientId: 3, nome: 'les cruders', limite: 1000000, saldo: 0 },
  { clientId: 4, nome: 'padaria joia de cocaia', limite: 10000000, saldo: 0 },
  { clientId: 5, nome: 'kid mais', limite: 500000, saldo: 0 }
]);
