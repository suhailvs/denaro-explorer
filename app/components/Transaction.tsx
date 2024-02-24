import React from "react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { Transaction } from "../interfaces/Transaction";
interface Data {
  ok: string;
  result: Transaction;
}
const DivInputs = ({ data }: { data: Transaction }) => {
  return data.inputs ? (
    <div>
      {data.inputs.map((item, index) => (
        <div className="alert alert-info" key={index}>
          <strong>Inputs({item.index})</strong>
          <br />
          <Link
            className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            href={`/transaction/${item.tx_hash}`}
          >
            Tx: {item.tx_hash.slice(0, 6)}-{item.tx_hash.slice(-6)}
          </Link>
          <br />
          <Link href={`/address/${item.address}`}>
            <small>{item.address}</small>
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
            <small>{item.address}</small>
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
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h4 className="mb-1">
          <Link
            className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            href={`/transaction/${item.hash}`}
          >
            {index}. #{item.hash.slice(0, 6)}-{item.hash.slice(-6)}
          </Link>
        </h4>
        <small>Coinbase: {item.is_coinbase ? "True" : "False"}</small>
      </div>
      <Link
        className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        href={`/block/${item.block_hash}`}
      >
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
