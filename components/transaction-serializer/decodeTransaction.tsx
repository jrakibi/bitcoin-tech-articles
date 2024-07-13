import { Transaction, networks } from 'bitcoinjs-lib'

class TransactionDecoder {
  rawTx: any
  network: any

  constructor(rawTx: any, network: any) {
    this.rawTx = rawTx
    this.network = network
  }

  decode() {
    const tx = Transaction.fromHex(this.rawTx)
    const decodedTransaction = {
      txid: tx.getId(),
      version: tx.version,
      locktime: tx.locktime,
      inputs: tx.ins.map((input, index) => ({
        txid: Buffer.from(input.hash).reverse().toString('hex'),
        n: input.index,
        script: input.script.length > 0 ? input.script.toString('hex') : '',
        sequence: input.sequence,
      })),
      outputs: tx.outs.map((output, index) => ({
        satoshi: output.value,
        value: (output.value * 1e-8).toFixed(8),
        n: index,
        scriptPubKey: {
          asm: output.script.toString('hex'), // Simplified, ideally you should convert to ASM format if needed
          hex: output.script.toString('hex'),
          type: '', // You can add more logic to determine type
          addresses: [], // Decoding addresses would need additional logic
        },
      })),
    }

    // Here you would expand to parse types and addresses correctly
    // This would depend on the script type and require additional handling

    return decodedTransaction
  }
}

export default TransactionDecoder
