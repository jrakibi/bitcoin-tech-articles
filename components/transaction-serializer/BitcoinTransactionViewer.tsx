import React, { useState, useEffect } from 'react'
import TransactionDecoder from './decodeTransaction'

const BitcoinTransactionViewer = ({ rawTx, network = 'bitcoin' }) => {
  const [transactionDetails, setTransactionDetails] = useState<any>(null)
  const [activeDetail, setActiveDetail] = useState('Hover over a field to see details')

  useEffect(() => {
    if (rawTx) {
      const decoder = new TransactionDecoder(rawTx, network)
      const details: any = decoder.decode()
      setTransactionDetails(details)
    }
  }, [rawTx, network])

  const parseScriptPubKey = (hex) => {
    const opcodes: any = {
      '76': 'OP_DUP',
      a9: 'OP_HASH160',
      '88': 'OP_EQUALVERIFY',
      ac: 'OP_CHECKSIG',
    }

    const parts: any = []
    let i = 0

    while (i < hex.length) {
      const byte = hex.substring(i, i + 2)
      if (opcodes[byte]) {
        // parts.push(`<span class="font-bold text-blue-600">${byte} (${opcodes[byte]})</span>`)
        parts.push(
          <span className="font-bold text-blue-600">
            {byte} ({opcodes[byte]})
          </span>
        )
        // parts.push(`<span class="font-bold text-blue-600">${byte} (${opcodes[byte]})</span>`)
        i += 2
      } else {
        const length = parseInt(byte, 16)
        i += 2
        const data = hex.substring(i, i + length * 2)
        parts.push(`<span class="text-gray-600">Data: ${data}</span>`)
        i += length * 2
      }
    }

    return parts.join('<br/>')
  }

  const handleDetailChange = (detail) => {
    setActiveDetail(detail)
  }

  return (
    <div className="flex flex-col items-start justify-center px-5 py-5 md:flex-row">
      <div className="mx-2 my-2 w-full rounded-lg bg-white p-6 shadow-lg md:my-0 md:w-1/2">
        <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-semibold text-gray-800">
          Transaction Details
        </h2>
        {transactionDetails ? (
          <div className="font-medium text-gray-900">
            <strong>Inputs</strong>
            {transactionDetails.inputs.map((input, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => handleDetailChange(JSON.stringify(input, null, 2))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDetailChange(JSON.stringify(input, null, 2))
                  }
                }}
                className="my-1 cursor-pointer break-words rounded p-3 hover:bg-blue-100"
              >
                Input {index + 1}: {input.txid} (Output Index: {input.n})
              </div>
            ))}
            <strong>Outputs</strong>
            {transactionDetails.outputs.map((output, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => handleDetailChange(parseScriptPubKey(output.scriptPubKey.hex))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDetailChange(parseScriptPubKey(output.scriptPubKey.hex))
                  }
                }}
                className="my-1 cursor-pointer break-all rounded p-3 hover:bg-blue-100"
              >
                Output {index + 1}: {output.value} BTC
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No transaction data available.</p>
        )}
      </div>
      <div className="mx-2 my-2 w-full rounded-lg bg-white p-6 shadow-lg md:my-0 md:w-1/2">
        <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-semibold text-gray-800">
          Details
        </h2>
        <div
          className="overflow-auto whitespace-pre-wrap p-3 text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: activeDetail }}
          style={{ maxHeight: '300px' }}
        ></div>
      </div>
    </div>
  )
}

export default BitcoinTransactionViewer
