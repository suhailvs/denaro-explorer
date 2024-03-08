import React from "react";
import Link from "next/link";
import { Transaction } from "../interfaces/Transaction";

const DivInputs = ({ data }: { data: Transaction }) => {
  return data.inputs ? (
    <div>
      {data.inputs.map((item, index) => (
        <div className="alert alert-info" key={index}>
          <strong>Inputs({item.index})</strong>
          <br />
          <Link href={`/transaction/${item.tx_hash}`}>
            Tx: {item.tx_hash.slice(0, 6)}-{item.tx_hash.slice(-6)}
          </Link>
          <br />
          <Link href={`/address/${item.address}`}>
            <small>
              Address: {item.address.slice(0, 6)}-{item.address.slice(-6)}
            </small>
          </Link>
          <br />
          <span>Amount: {item.amount}</span>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

const DivOutputs = ({ data }: { data: Transaction }) => {
  return (
    <div>
      {data.outputs.map((item, index) => (
        <div className="alert alert-success" key={index}>
          <strong>Outputs:</strong>
          <br />
          <Link href={`/address/${item.address}`}>
            <small>
              Address: {item.address.slice(0, 6)}-{item.address.slice(-6)}
            </small>
          </Link>
          <br />
          <span>Amount: {item.amount}</span>
        </div>
      ))}
    </div>
  );
};

const TransactionComponent = ({
  item,
  index,
}: {
  item: Transaction;
  index: number;
}) => {
  return (
    <div className="list-group-item">
      <div className="d-flex w-100 justify-content-between">
        <h4 className="mb-1">
          <Link href={`/transaction/${item.hash}`}>
            {index}. #{item.hash.slice(0, 6)}-{item.hash.slice(-6)}
          </Link>
        </h4>
        <small>{item.is_coinbase ? "Coinbase" : ""}</small>
      </div>
      <Link href={`/block/${item.block_hash}`}>
        Block: {item.block_hash.slice(0, 6)}-{item.block_hash.slice(-6)}
      </Link>
      <br />
      <DivInputs data={item} />
      <DivOutputs data={item} />
      <small>
        <strong>Fee:</strong> {item.fees ? item.fees : "-"} {" • "}
        <strong>Message:</strong> {item.message ? item.message : "-"}
      </small>
    </div>
  );
};

export default TransactionComponent;
