import React from 'react'

const TransactionDetails = async ({ params }: { params: { transactionid: string } }) => {
  return (
    <div>TransactionDetails {params.transactionid}</div>
  )
}

export default TransactionDetails