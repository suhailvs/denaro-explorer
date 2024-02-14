import React from "react";
import Navbar from "@/app/components/Navbar";
import "bootstrap/dist/css/bootstrap.css";

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

const AddressDetails = async ({
  params,
}: {
  params: { addressid: string };
}) => {
  const transactions = await fetch(
    `${process.env.API_URL}/get_address_info?address=${params.addressid}&transactions_count_limit=5`,
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
              <small className="text-body-secondary">Denaro Address: </small><br />
              {params.addressid}
            </h5>
            <div className="alert alert-warning" role="alert">
              <strong>Denaro Balance</strong>
              <br />
              <h3>{transactions_data.result.balance} DNR</h3>
            </div>
          </div>
        </div>

        <h1 className="text-center">ADDRESS INFO</h1>
        <h5 className="text-center">{params.addressid}</h5>
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

export default AddressDetails;
