import React from "react";
import Navbar from "@/app/components/Navbar";
import "bootstrap/dist/css/bootstrap.css";

const BlockDetails = async ({ params }: { params: { blockid: string } }) => {
  return (
    <>
      <Navbar />
      <div>BlockDetails {params.blockid}</div>
    </>
  );
};

export default BlockDetails;

/*




interface Transactions {
  is_coinbase: any;
  hash: string;
}
interface Result {
  transactions: Transactions[];
  balance: string;
}

interface Data {
  ok: string;
  result: Result;
}

const BlockDetails = async ({ params }: { params: { blockid: string } }) => {
  const transactions = await fetch(
    `${process.env.API_URL}/get_block_info?block=${params.blockid}&transactions_count_limit=5`,
    { cache: "no-store" }
  );
  const transactions_data: Data = await transactions.json();

  return (
    <>
      <Navbar />
      <div className="container">
        <br />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h5>
              <small className="text-body-secondary">Denaro block: </small>
              <br />
              {params.blockid}
            </h5>
            <div className="alert alert-warning" role="alert">
              <strong>Denaro Balance</strong>
              <br />
              <h3>{transactions_data.result.balance} DNR</h3>
            </div>
          </div>
        </div>

        <h1 className="text-center">block INFO</h1>
        <h5 className="text-center">{params.blockid}</h5>
        <p className="text-center">
          Balance {transactions_data.result.balance} DNR
        </p>
        <p className="lead text-center">Latest 5 transactions</p>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>Hash</td>
                <td>Coinbase</td>
                <td>Message</td>
              </tr>
            </thead>
            <tbody>
              {transactions_data.result.transactions.map((data) => (
                <tr key={data.hash}>
                  <td>{data.hash}</td>
                  <td>{data.is_coinbase}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BlockDetails;
*/
