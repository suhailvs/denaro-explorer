import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
interface Block {
  id: number;
  hash: string;
  address: string;
  difficulty: any;
  // reward: number;
  timestamp: number;
}

interface Result {
  block: Block;
  transactions: [];
}

interface Data {
  ok: string;
  result: Result[];
}

const HomeTable = async () => {
  // https://node-forwarder.denaro.is
  const mining = await fetch(
    `${process.env.api_base_url}/get_mining_info`,
    { cache: "no-store" }
    // { next: { revalidate: 10 } }
  );
  const mining_data = await mining.json();
  const last_block_id = mining_data.result.last_block.id - 4;
  const last_5_blocks = await fetch(
    `${process.env.api_base_url}/get_blocks?offset=${last_block_id}&limit=5`
  );
  const last_5_blocks_data: Data = await last_5_blocks.json();

  return (
    <>
      <br />
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="card">
            <h5 className="card-header">Latest Blocks</h5>
            <div className="card-body">
              <div className="list-group">
                {last_5_blocks_data.result.reverse().map((block_data) => (
                  <div
                    className="list-group-item list-group-item-action"
                    key={block_data.block.id}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-1">
                        <Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                          href={`/block/${block_data.block.id}`}
                        >
                          #{block_data.block.id}
                        </Link>
                        
                      </h4>
                      <small>
                        {new Date(
                          block_data.block.timestamp * 1000
                        ).toLocaleString()}
                      </small>
                    </div>
                    <span className={styles.text_small}>
                      Hash: <strong>{block_data.block.hash}</strong>
                    </span>
                    <br />
                    <Link
                      href={`/address/${block_data.block.address}`}
                      className="link-info link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
                    >
                      <small>{block_data.block.address}</small>
                    </Link>
                    <br />
                    <small>
                      {block_data.transactions.length} {"Txs • "}
                      {block_data.block.difficulty} Difficulty
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTable;
