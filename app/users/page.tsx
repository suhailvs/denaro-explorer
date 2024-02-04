import React from 'react'
interface Block {
    id: number;
    hash: string;
}

interface Result {
    block: Block,
    transactions: []
}

interface Response {
    ok: string;    
    result: Result[]
}


const UsersPage = async () => {
    const res = await fetch(
        'https://node-forwarder.denaro.is/get_blocks?offset=333178&limit=5',
        // {next: {revalidate:10}}
        {cache: 'no-store'}
        )
    const users: Response = await res.json();
    
    return (
    <>
    <h1> Users</h1>
        <ul>
            {users.result.map(user => <li key={user.block.id}>{user.block.id}: {user.block.hash}</li>)}
        </ul>
    </>
  )
}

export default UsersPage