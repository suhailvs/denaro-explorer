import React from "react";
import Navbar from "@/app/components/Navbar";
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
      <Navbar />
      <div className="container">
        <br />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h5>
              <small className="text-body-secondary">Block: </small>
              <br />
              {params.blockid}
            </h5>
            <ul>
              <li>{block.id}</li>
              <li>{block.hash}</li>
              <li>{block.content}</li>
              <li>{block.address}</li>
              <li>{block.random}</li>
              <li>{block.difficulty}</li>
              <li>{block.reward}</li>
              <li>{block.timestamp}</li>
            </ul>
          </div>
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
