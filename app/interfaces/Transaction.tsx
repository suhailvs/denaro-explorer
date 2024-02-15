interface Inputs {
  index: number;
  tx_hash: string;
  address: string;
  amount: number;
}
interface Outputs {
  address: string;
  amount: number;
}
export interface Transaction {
  is_coinbase: boolean;
  hash: string;
  block_hash: string;
  message?: string;
  inputs?: Inputs[];
  delta?: any;
  fees?: number;
  outputs: Outputs[];
}
