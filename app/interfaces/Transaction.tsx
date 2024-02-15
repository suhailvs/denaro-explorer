interface Input {
  index: number;
  tx_hash: string;
  address: string;
  amount: number;
}
interface Output {
  address: string;
  amount: number;
}
export interface Transaction {
  is_coinbase: boolean;
  hash: string;
  block_hash: string;
  message?: string;
  inputs?: Input[];
  delta?: any;
  fees?: number;
  outputs: Output[];
}
