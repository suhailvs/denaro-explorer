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
  const mining = await fetch(
    "https://node-forwarder.denaro.is/get_mining_info",
    { cache: "no-store" }
    // { next: { revalidate: 10 } }
  );
  const mining_data = await mining.json();
  const last_block_id = mining_data.result.last_block.id - 4;
  const last_5_blocks = await fetch(
    `https://node-forwarder.denaro.is/get_blocks?offset=${last_block_id}&limit=5`
  );
  const last_5_blocks_data: Data = await last_5_blocks.json();

  return (
    <>
      <h1 className="text-center">LATEST BLOCKS</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>ID</td>
              <td>Hash</td>
              <td>Address</td>
              <td>Difficulty</td>
              <td>Transactions</td>
              <td>Time</td>
            </tr>
          </thead>
          <tbody>
            {last_5_blocks_data.result.reverse().map((block_data) => (
              <tr key={block_data.block.id}>
                <td>{block_data.block.id}</td>
                <td className={styles.text_small}>{block_data.block.hash}</td>
                <td className={styles.text_small}>
                  <Link href={`/address/${block_data.block.address}`}>
                    {block_data.block.address}
                  </Link>
                </td>
                <td>{block_data.block.difficulty}</td>
                <td>{block_data.transactions.length}</td>
                <td>{block_data.block.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomeTable;
