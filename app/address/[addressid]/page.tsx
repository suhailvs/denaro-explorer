import React from "react";
import { Transaction } from "../../interfaces/Transaction";
import TransactionComponent from "@/app/components/Transaction";
interface Data {
  ok: string;
  result: Result;
}
interface Result {
  transactions: Transaction[];
  balance: string;
  spendable_outputs: Spendable_Output[];
}
interface Spendable_Output {
  amount: string;
  tx_hash: string;
  index: number;
}

const AddressDetails = async ({
  params,
}: {
  params: { addressid: string };
}) => {
  const transactions = await fetch(
    `${process.env.api_base_url}/get_address_info?address=${params.addressid}&transactions_count_limit=50`,
    { cache: "no-store" }
  );
  const transactions_data: Data = await transactions.json();

  return (
    <>
      <h5>
        Denaro Address: {params.addressid.slice(0, 6)}-
        {params.addressid.slice(-6)}
        <br />
      </h5>
      <span className="text-xsmall">{params.addressid}</span>
      <div className="alert alert-warning" role="alert">
        <strong>Denaro Balance</strong>
        <br />
        <h3>{transactions_data.result.balance} DNR</h3>
      </div>

      <div className="card">
        <h5 className="card-header">Latest 50 transactions</h5>
        <div className="card-body">
          <div className="list-group">
            {transactions_data.result.transactions.map((item, index) => (
              <TransactionComponent key={index} item={item} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressDetails;

/*
{
    "ok": true,
    "result": {
        "balance": "9484455.487788",
        "spendable_outputs": [
            {
                "amount": "250000",
                "tx_hash": "096adec446eb0efcd280224dac1bad0994c6b10674cf42b58250b9622073d6e9",
                "index": 0
            }
        ],
        "transactions": [
            {
                "is_coinbase": true,
                "hash": "fe92ea0a29c722ab11f65ab6603566b7f216aa49a3cd26526e5c078e1bdace27",
                "block_hash": "d43499570150163d5251c3277804f0e6c2252615896633833b87fcb0742cab20",
                "outputs": [
                    {
                        "address": "DnVQMi33h4UeXZb1TUc7KMoeWTyR7EiF82h4yFitsviJw",
                        "amount": 25.000002
                    }
                ]
            },
            {
                "is_coinbase": false,
                "hash": "2a8b6759aaa0028f72211438815a686c6c9d096508b8923dd7d75785762a12ab",
                "block_hash": "1e443da9b3d927c1b5334b68456f545f05f109c01bd068f9795254c6539d5c4b",
                "message": "1ef1b8643a9d45816ab18dfa02fcb4918b2c3a1f10",
                "inputs": [
                    {
                        "index": 5,
                        "tx_hash": "32f0995c6ec672b09065aea78db6346bbf32ce73e366fde6f7f20bad414a3e5e",
                        "address": "E3JcPJsdAwbcr35hGvrhmwYBzyLuW6M38iD16MEHTK85F",
                        "amount": 917.330162
                    },
                    {
                        "index": 0,
                        "tx_hash": "32f0995c6ec672b09065aea78db6346bbf32ce73e366fde6f7f20bad414a3e5e",
                        "address": "E3JcPJsdAwbcr35hGvrhmwYBzyLuW6M38iD16MEHTK85F",
                        "amount": 5508
                    },
                   
                ],
                "delta": null,
                "fees": 0.0,
                "outputs": [
                    {
                        "address": "E44A1wuj8CWxqCTnNSkFyxby24vWe7dAcvJUbmvSsrqPT",
                        "amount": 28457.330162
                    }
                ]
            },
            {
                "is_coinbase": false,
                "hash": "a28784cb44e29878ddb267bb631ff833beacf2a9b207012b5365ffc6454be805",
                "block_hash": "c19e382d14f2b6496feb8be02c2806fd00ae653afc281df8d51c7878604cbc12",
                "message": "1efc25335b4b2f1ba90efb34075c713aca6d1a5366",
                "inputs": [
                    {
                        "index": 0,
                        "tx_hash": "fce0a8aa6fde4a050b6254a61da0c92dac0c762093621dafcdc795feba9aeff7",
                        "address": "DwzmkP1AWueq4wHBVdRgFL9bYbpVzL5KyBigaA3fX857Q",
                        "amount": 24036.08726
                    },
                    {
                        "index": 0,
                        "tx_hash": "e74113599ef03659629b00cf614fb531d7c49729380b3a456565c69b3a7919e5",
                        "address": "DiTkPY1T2azVpgGra74UEwETVtJm3BGnNt5dozrkSgT3z",
                        "amount": 20000
                    }
                ],
                "delta": null,
                "fees": 0.0,
                "outputs": [
                    {
                        "address": "E44A1wuj8CWxqCTnNSkFyxby24vWe7dAcvJUbmvSsrqPT",
                        "amount": 24499.53
                    },
                    {
                        "address": "DiTkPY1T2azVpgGra74UEwETVtJm3BGnNt5dozrkSgT3z",
                        "amount": 19536.55726
                    }
                ]
            },
           
        ],
        "pending_transactions": null,
        "pending_spent_outputs": null
    }
}
*/
