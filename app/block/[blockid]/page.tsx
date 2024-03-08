import React from "react";
import Link from "next/link";
import LocalDateTime from "@/app/components/local-time";
interface Data {
  ok: string;
  result: Result;
}
interface Result {
  block: Block;
  full_transactions: Full_Transaction[];
}
interface Block {
  id: number;
  hash: string;
  content: string;
  address: string;
  random: number;
  difficulty: number;
  reward: number;
  timestamp: number;
}
interface Full_Transaction {
  hash: string;
  is_coinbase: boolean;
}

const BlockDetails = async ({ params }: { params: { blockid: string } }) => {
  const blocks_fetch = await fetch(
    `${process.env.api_base_url}/get_block?block=${params.blockid}&full_transactions=true`
  );
  const data: Data = await blocks_fetch.json();
  const block = data.result.block;
  return (
    <>
      <div className="card">
        <h5 className="card-header">Denaro Block: #{block.id}</h5>
        
        <div className="card-body">
          Mined on:
          <small>
            <LocalDateTime timestamp={block.timestamp} />
          </small>
          <ul className="list-group">
            <li className="list-group-item">
              Hash: {block.hash.slice(0, 6)}-{block.hash.slice(-6)}<br />
              <span className="text-xxsmall">{block.hash}</span>
            </li>
            <li className="list-group-item">Difficulty: {block.difficulty}</li>
            <li className="list-group-item">
              Mined by:{" "}
              <Link href={`/address/${block.address}`}>
                <small>
                  {block.address.slice(0, 6)}-{block.address.slice(-6)}
                </small>
              </Link>
            </li>
            <li className="list-group-item">
              Mining reward: {block.reward} DNR
            </li>
          </ul>
          <br />
          <p className="lead">Block Transactions:</p>
          {data.result.full_transactions.map((item) => (
            <div className="alert alert-success" key={item.hash}>
              Txs Hash:
              <Link
                className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href={`/transaction/${item.hash}`}
              >
                {item.hash.slice(0, 6)}-{item.hash.slice(-6)}
              </Link>
              <br />
              <small>Coinbase: {item.is_coinbase ? "True" : "False"}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlockDetails;

/*

{
    "ok": true,
    "result": {
        "block": {
            "id": 339333,
            "hash": "250e54442122fdbc787f13e5bf13cc8ce06a8a07b4a18ee75cec3f2d24d716b1",
            "content": "022aaa361ce4d5b711abf9f06d7e71f43efdf94e519adfde83141ac19250e544422b092aaf593007857503046e1aecf0ceb3bcf63686e57eaacd447fe03df2e3365ce39632c2952697f88664367642c58ca02ba072cdc37c231fe4d7205cccd418c1666dcd655a00f2cd0b67",
            "address": "DnVQMi33h4UeXZb1TUc7KMoeWTyR7EiF82h4yFitsviJw",
            "random": 1728826866,
            "difficulty": 9.7,
            "reward": 25.000001,
            "timestamp": 1707961702
        },
        "transactions": null,
        "full_transactions": [
            {
                "hash": "bcc358cc14cc25bd5cc54e59873ee77a7a595100781c919a7f496db9f6cae72f",
                "is_coinbase": true
            },
            {
                "hash": "b950f9921adbb00de8feb8bd9b17759e3ace2efddc37d82da69ecb0cc391e011",
                "is_coinbase": false
            }
        ]
    }
}
*/
