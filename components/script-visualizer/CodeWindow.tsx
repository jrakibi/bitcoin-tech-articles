import React from 'react'

interface CodeWindowProps {
  activeStep: number // Index of the active step
  svgSteps: Array<{ name: string; description: string; code: string; category: string }>
  onCodeClick: (index: number) => void
}

const CodeWindow: React.FC<CodeWindowProps> = ({ activeStep, svgSteps, onCodeClick }) => {
  // Filter steps by category
  const unlockScriptSteps = svgSteps.filter((step) => step.category === 'UnlockScript')
  const pubKeyScriptSteps = svgSteps.filter((step) => step.category === 'PubKeyScript')

  // Find the indexes for unlockScript and pubKeyScript based on the original list
  const unlockScriptIndex = unlockScriptSteps.findIndex((step) => svgSteps[activeStep] === step)
  const pubKeyScriptIndex = pubKeyScriptSteps.findIndex((step) => svgSteps[activeStep] === step)

  return (
    <div className="rounded-lg bg-black p-6 font-mono text-lg">
      <div className="mb-6 flex space-x-2">
        <div className="h-4 w-4 rounded-full bg-red-500"></div>
        <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
        <div className="h-4 w-4 rounded-full bg-green-500"></div>
      </div>
      <p className="text-gray-500"># UnlockScript/ScriptSig</p>
      {unlockScriptSteps.map((step, index) => (
        <p
          key={step.name}
          className={`cursor-pointer rounded p-1 ${unlockScriptIndex === index ? 'bg-gray-700 text-orange-500' : activeStep > index ? 'text-green-500' : 'text-white'}`}
          onClick={() => onCodeClick(svgSteps.indexOf(step))}
        >
          {step.code}
        </p>
      ))}
      <p className="text-gray-500"># PubKeyScript</p>
      {pubKeyScriptSteps.map((step, index) => (
        <p
          key={step.name}
          className={`cursor-pointer rounded p-1 ${pubKeyScriptIndex === index ? 'bg-gray-700 text-orange-500' : activeStep > index ? 'text-green-500' : 'text-white'}`}
          onClick={() => onCodeClick(svgSteps.indexOf(step))}
        >
          {step.code}
        </p>
      ))}
    </div>
  )
}

export default CodeWindow

// // components/CodeWindow.tsx
// import { useState } from 'react';

// interface CodeWindowProps {}

// const CodeWindow: React.FC<CodeWindowProps> = () => {
//   const [clickedItem, setClickedItem] = useState<string>('');

//   const handleClick = (item: string): void => {
//     setClickedItem(`You clicked on: ${item}`);
//     // Additional logic based on the item can be handled here
//   };

//   return (
//     <div className="bg-gray-800 font-mono text-lg p-6 rounded-lg">
//       <div className="flex space-x-2 mb-6">
//         <div className="w-4 h-4 bg-red-500 rounded-full"></div>
//         <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
//         <div className="w-4 h-4 bg-green-500 rounded-full"></div>
//       </div>
//       <p className="text-gray-500"># UnlockScript/ScriptSig</p>
//       <p className="text-green-400 cursor-pointer hover:bg-gray-700 p-1 rounded"
//          onClick={() => handleClick('Signature')}>
//         [Signature]
//       </p>
//       <br />
//       <p className="text-gray-500"># PubKeyScript</p>
//       <p className="text-green-400 cursor-pointer hover:bg-gray-700 p-1 rounded"
//          onClick={() => handleClick('Public Key')}>
//         [Public Key]
//       </p>
//       <p className="text-green-400 cursor-pointer hover:bg-gray-700 p-1 rounded"
//          onClick={() => handleClick('OP_CHECKSIG')}>
//         &lt;OP_CHECKSIG&gt;
//       </p>
//     </div>
//   );
// };

// export default CodeWindow;
