'use client'
import React, { useState } from 'react'
import BitcoinTransactionViewer from './BitcoinTransactionViewer'
import { BitcoinTransactionComponent } from './BitcoinTransactionComponent'

const TransactionsDisplay = () => {
  const [activeTransaction, setActiveTransaction] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  const handleTransactionClick = (transactionNumber) => {
    if (activeTransaction === transactionNumber && showDetails) {
      setShowDetails(false)
      setActiveTransaction(0)
    } else {
      setActiveTransaction(transactionNumber)
      setShowDetails(true)
    }
  }

  const transaction1Details =
    '0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000'
  const transaction2Details =
    '0100000001169e1e83e930853391bc6f35f605c6754cfead57cf8387639d3b4096c54f18f400000000484730440220576497b7e6f9b553c0aba0d8929432550e092db9c130aae37b84b545e7f4a36c022066cb982ed80608372c139d7bb9af335423d5280350fe3e06bd510e695480914f01ffffffff0100ca9a3b000000001976a914340cfcffe029e6935f4e4e5839a2ff5f29c7a57188ac00000000'

  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <BitcoinTransactionComponent
          transaction1Script={['<Public Key>', 'OP_CHECKSIG']}
          transaction2Script={['<Signature>']}
          onTransaction1Click={() => handleTransactionClick(1)}
          onTransaction2Click={() => handleTransactionClick(2)}
          activeTransaction={activeTransaction}
        />
      </div>
      {showDetails && (
        <div className="mt-4 rounded-lg">
          <BitcoinTransactionViewer
            rawTx={activeTransaction === 1 ? transaction1Details : transaction2Details}
            network={'testnet'}
          />
        </div>
      )}
    </div>
  )
}

export default TransactionsDisplay
