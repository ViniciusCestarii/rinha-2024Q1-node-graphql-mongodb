import mongoose from "./db";

const { Schema } = mongoose;

export interface ICliente extends Document {
  nome: string;
  saldo: number;
  limite: number;
}

const clienteSchema = new Schema({
  clientId: { type: Number, required: true, unique: true }, // Unique numeric ID
  saldo: { type: Number, required: true, default: 0 },
  limite: { type: Number, required: true },
  nome: { type: String, required: true },
});

const Cliente = mongoose.model<ICliente>('Cliente', clienteSchema);

interface ITransacao extends Document {
  valor: number;
  tipo: string;
  descricao: string;
  cliente_id: mongoose.Schema.Types.ObjectId;
  realizada_em: Date;
}

const transacaoSchema = new Schema({
  valor: { type: Number, required: true },
  tipo: { type: String, required: true },
  descricao: { type: String, required: true },
  cliente_id: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  realizada_em: { type: Date, default: Date.now },
});

const Transacao = mongoose.model<ITransacao>('Transacao', transacaoSchema);

export { Cliente, Transacao };