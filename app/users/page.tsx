import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
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

const UsersPage = async () => {
  const mining_data = await fetch(
    "https://node-forwarder.denaro.is/get_mining_info",
    { cache: "no-store" }
  );
  const data2 = await mining_data.json();
  const last_block_id = data2.result.last_block.id - 4;
  const res = await fetch(
    `https://node-forwarder.denaro.is/get_blocks?offset=${last_block_id}&limit=5`,
    // {next: {revalidate:10}}
    { cache: "no-store" }
  );
  const users: Data = await res.json();

  return (
    <>
      <h1> Users</h1>
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
        {users.result.reverse().map((user) => (
          <tr key={user.block.id}>
            <td>{user.block.id}</td>
            <td>{user.block.hash}</td>
            <td>{user.block.address}</td>
            <td>{user.block.difficulty}</td>
            <td>{user.transactions.length}</td>
            <td>{user.block.timestamp}</td>
          </tr>
        ))}
        </tbody>
      </table>

      
    </>
  );
};

export default UsersPage;
