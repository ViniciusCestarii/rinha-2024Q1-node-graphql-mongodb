import mongoose, { Document, Schema } from 'mongoose';

export interface ICliente extends Document {
  clientId: number;
  nome: string;
  saldo: number;
  limite: number;
}

const clienteSchema = new Schema({
  clientId: { type: Schema.Types.Number, required: true, unique: true },
  saldo: { type: Number, required: true, default: 0 },
  limite: { type: Number, required: true },
  nome: { type: String, required: true },
});

const Cliente = mongoose.model<ICliente>('Cliente', clienteSchema);

interface ITransacao extends Document {
  valor: number;
  tipo: string;
  descricao: string;
  clientId: number;
  realizada_em: Date;
}

const transacaoSchema = new Schema({
  valor: { type: Number, required: true },
  tipo: { type: String, required: true },
  descricao: { type: String, required: true },
  clientId: { type: Schema.Types.Number, ref: 'Cliente', required: true },
  realizada_em: { type: Date, default: Date.now },
});

const Transacao = mongoose.model<ITransacao>('Transacao', transacaoSchema);

export { Cliente, Transacao };