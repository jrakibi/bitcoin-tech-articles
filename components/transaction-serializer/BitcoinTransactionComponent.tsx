import React from 'react'

export const BitcoinTransactionComponent = ({
  transaction1Script,
  transaction2Script,
  onTransaction1Click,
  onTransaction2Click,
  activeTransaction,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-between bg-white p-5 shadow-lg md:flex-row">
      {/* Transaction 1 */}
      <div
        role="button"
        tabIndex={0}
        className={`flex w-full transform flex-col transition duration-300 ease-in-out md:flex-row ${activeTransaction === 1 ? 'scale-105 bg-blue-100' : 'hover:scale-101'} cursor-pointer`}
        onClick={onTransaction1Click}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onTransaction1Click()
          }
        }}
      >
        <div className="w-full rounded-lg border-2 border-gray-200 shadow-sm">
          <div className="text-md item-center pt-3 text-center font-medium text-gray-800">
            Transaction 1: Satoshi sends to Hal Finney
          </div>

          <div className="grid grid-cols-2 gap-4 p-5">
            <div className="rounded-lg border border-gray-100 bg-white p-3 hover:bg-gray-50">
              <div className="font-semibold text-gray-800">Input</div>
              <div className="text-sm text-gray-600">{transaction1Script[0]}</div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
              <div className="font-semibold text-gray-800">Output</div>
              <div className="text-sm text-gray-600">
                {transaction1Script.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Arrow */}
      <svg
        width="60"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-5 text-gray-500"
      >
        <path
          d="M2 12h20M18 8l4 4-4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Transaction 2 */}
      <div
        role="button"
        tabIndex={0}
        className={`flex w-full transform flex-col transition duration-300 ease-in-out md:flex-row ${activeTransaction === 2 ? 'scale-105 bg-blue-100' : 'hover:scale-101'} cursor-pointer`}
        onClick={onTransaction2Click}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onTransaction2Click()
          }
        }}
      >
        <div className="w-full rounded-lg border-2 border-gray-200 shadow-sm">
          <div className="text-md item-center pt-3 text-center font-medium text-gray-800">
            Transaction 2: Hal spends the received Bitcoin
          </div>

          <div className="grid grid-cols-2 gap-4 p-5">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
              <div className="font-semibold text-gray-800">Input</div>
              <div className="text-sm text-gray-600">
                {transaction2Script.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-3 hover:bg-gray-50">
              <div className="font-semibold text-gray-800">Output</div>
              <div className="text-sm text-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
