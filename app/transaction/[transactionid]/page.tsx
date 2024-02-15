import React from "react";
import Navbar from "@/app/components/Navbar";
import { Transaction } from '../../interfaces/Transaction';


interface Data {
  ok: boolean;
  result: Transaction;
}

const TransactionDetails = async ({
  params,
}: {
  params: { transactionid: string };
}) => {
  const transaction = await fetch(
    `${process.env.api_base_url}/get_transaction?tx_hash=${params.transactionid}&verify=true`
  );
  const data: Data = await transaction.json();

  console.log(data);
  const result = data.result;

  if (data.ok) {
    return (
      <>
        <Navbar />
        <div className="container">
          <br />
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h5>
                <small className="text-body-secondary">
                  Transaction Hash:{" "}
                </small>
                <br />
                {params.transactionid}
              </h5>

              {result.is_coinbase}
              {result.hash}
  {result.block_hash}
  {result.message}
  {result.inputs}
  {result.delta}
  {result.fees}
  {result.outputs}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="container">
          <br />
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="alert alert-danger" role="alert">
                <h1>Transaction Not Found</h1>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default TransactionDetails;
/*

{
  "ok": true,
  "result": {
      "is_coinbase": false,
      "hash": "66180c7164a5f3b885adacf67d09b0c1e4f0691c0149f671d3ed1c63968d620a",
      "block_hash": "e9f87436a19660c6361c4bcc2ac12eb196ed3b5911e2b52dd6db365e1f137198",
      "message": "53776170207472616e73616374696f6e",
      "inputs": [
          {
              "index": 1,
              "tx_hash": "26d658fdb1829f78f5aa90592b593d327ac2246bbe6602f5b1d696ce4218042c",
              "address": "E44A1wuj8CWxqCTnNSkFyxby24vWe7dAcvJUbmvSsrqPT",
              "amount": 248408.312265
          }
      ],
      "delta": null,
      "fees": 0.0,
      "outputs": [
          {
              "address": "DX9n7N3t3yBqdixnYHK4td6CPPcH3D8zsVcF6FQtvdQ6b",
              "amount": 3186.400033
          },
          {
              "address": "E44A1wuj8CWxqCTnNSkFyxby24vWe7dAcvJUbmvSsrqPT",
              "amount": 245221.912232
          }
      ]
  }
}

{
  "ok": true,
  "result": {
      "is_coinbase": true,
      "hash": "84f7951526ca08226b41559dcf2eba1b222642ecf9058d93c0edce51befe319c",
      "block_hash": "fdd92ae951652593557d00d97ffbd81219cd09a57d5a51ebd82f318971ca284c",
      "outputs": [
          {
              "address": "E1vB9nb1eJHqYFmt3P7gepHHcszUorM2qsy4KtTGaKBDe",
              "amount": 25.000002
          }
      ]
  }
}
*/
