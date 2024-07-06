'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  RewindIcon,
  FastForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from '@heroicons/react/solid' // Importing icons

const svgPaths = [
  '/tx-serializer/tx1.png',
  '/tx-serializer/tx2.png',
  '/tx-serializer/tx3.png',
  '/tx-serializer/tx4.png',
  '/tx-serializer/tx5.png',
  '/tx-serializer/tx6.png',
  '/tx-serializer/tx7.png',
  '/tx-serializer/tx8.png',
  '/tx-serializer/tx9.png',
  '/tx-serializer/tx10.png',
]

const svgSteps = [
  {
    name: 'Version',
    description: 'Transaction format version.',
    svgPath: svgPaths[0],
    status: 'complete',
    code: '[Signature]',
    category: 'UnlockScript',
  },
  {
    name: 'Input Count',
    description: 'Number of inputs.',
    svgPath: svgPaths[1],
    status: 'current',
    code: '[Public Key]',
    category: 'PubKeyScript',
  },
  {
    name: 'TXID (Input 0)',
    description: 'Transaction ID ',
    svgPath: svgPaths[2],
    status: 'upcoming',
    code: '<OP_CHECKSIG>',
    category: 'PubKeyScript',
  },
  {
    name: 'Vout (Input 0)',
    description: 'Index of the output',
    svgPath: svgPaths[3],
    status: 'upcoming',
    code: '',
    category: '',
  },
  {
    name: 'SigScriptSize (Input 0)',
    description: 'Size of the unlocking script',
    svgPath: svgPaths[4],
    status: 'upcoming',
    code: '',
    category: '',
  },
  {
    name: 'SigScript (Input 0)',
    description: 'Sript that unlocks',
    svgPath: svgPaths[5],
    status: 'upcoming',
    code: '',
    category: '',
  },
  {
    name: 'Upcoming Data Size (OP_71)',
    description: 'Size of the upcoming data.',
    svgPath: svgPaths[6],
    status: 'upcoming',
    code: '',
    category: '',
  },
  {
    name: 'Sequence (input 0)',
    description: 'Sequence number',
    svgPath: svgPaths[7],
    status: 'upcoming',
    code: '',
    category: '',
  },
  {
    name: 'Output Count',
    description: 'Number of outputs',
    svgPath: svgPaths[8],
    status: 'upcoming',
    code: '',
    category: '',
  },
  {
    name: 'Step',
    description: '',
    svgPath: svgPaths[9],
    status: 'upcoming',
    code: '',
    category: '',
  },
]

interface TransactionSerializerProps {
  type: string
  children: React.ReactNode
}

export default function TransactionSerializer({ type, children }: TransactionSerializerProps) {
  const [svgIndex, setSvgIndex] = useState(0)
  // Specify the type for useRef, assuming HTMLObjectElement for an embedded SVG
  const svgRef = useRef<HTMLObjectElement>(null)

  const handlePlayerAction = (action: string) => {
    if (svgRef.current && svgRef.current.contentDocument) {
      const svgElement = svgRef.current.contentDocument.getElementById('p2pk')
      if (svgElement && (svgElement as any).svgatorPlayer) {
        ;(svgElement as any).svgatorPlayer.ready(() => {
          ;(svgElement as any).svgatorPlayer[action]()
        })
      }
    }
  }

  useEffect(() => {
    handlePlayerAction('play')
  }, [svgIndex])

  const handleSvgSelect = (index) => {
    setSvgIndex(index)
    setTimeout(() => handlePlayerAction('play'), 100)
  }

  // Function to handle switching SVGs and autoplay
  const handleSvgSwitch = (direction) => {
    setSvgIndex((prev) => {
      const newIndex =
        direction === 'next'
          ? (prev + 1) % svgPaths.length
          : (prev - 1 + svgPaths.length) % svgPaths.length
      setTimeout(() => handlePlayerAction('play'), 100) // A slight delay to ensure the SVG is loaded

      return newIndex
    })
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const getStatusIcon = (index) => {
    if (index < svgIndex) {
      return <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
    } else if (index === svgIndex) {
      return <span className="h-2.5 w-2.5 rounded-full bg-orange-600" />
    } else {
      return <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      {/* <NavBar></NavBar> */}

      <div className="mx-auto flex w-full max-w-6xl space-x-2 rounded-lg bg-gray-800 p-2">
        <nav aria-label="Progress" className="w-2/5">
          {/* Control Buttons */}
          <div className="mb-2 flex justify-center space-x-1">
            <button
              onClick={() => handleSvgSwitch('prev')}
              className={`p-1 ${svgIndex > 0 ? 'text-orange-500 hover:text-orange-700' : 'text-gray-400'} cursor-pointer rounded`}
              disabled={svgIndex === 0}
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePlayerAction('play')}
              className="cursor-pointer rounded p-1 text-orange-500 hover:text-orange-700"
            >
              <PlayIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePlayerAction('pause')}
              className="cursor-pointer rounded p-1 text-orange-500 hover:text-orange-700"
            >
              <PauseIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleSvgSwitch('next')}
              className={`p-1 ${svgIndex < svgSteps.length - 1 ? 'text-orange-500 hover:text-orange-700' : 'text-gray-400'} cursor-pointer rounded`}
              disabled={svgIndex === svgSteps.length - 1}
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          <ol role="list" className="overflow-hidden">
            {svgSteps.map((step, index) => (
              <li key={step.name} className="relative pb-4">
                <button
                  onClick={() => handleSvgSelect(index)}
                  className="group relative flex w-full items-start text-left"
                >
                  <span className="flex h-8 items-center">
                    <span
                      className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full ${index === svgIndex ? 'bg-orange-600' : index < svgIndex ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'} group-hover:bg-orange-800`}
                    >
                      {getStatusIcon(index)}
                    </span>
                  </span>
                  <span className="ml-2 flex min-w-0 flex-col justify-center">
                    <span
                      className={`text-xs font-medium ${index <= svgIndex ? 'text-orange-600' : 'text-gray-500'}`}
                    >
                      {step.name}
                    </span>
                    <span className="text-xs text-gray-500">{step.description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* <div>
          <CodeWindow activeStep={svgIndex} svgSteps={svgSteps} onCodeClick={handleSvgSelect} />
        </div> */}
        </nav>

        {/* <Image
      src={svgSteps[svgIndex].svgPath}
      alt="Your browser does not support SVGs"
      width={500}
      height={300}
      className="h-auto w-3/5 rounded-lg bg-gray-200 shadow-xl"
      layout="intrinsic"
    /> */}

        <div className="flex items-center justify-center">
          <div className="mx-auto w-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src={svgSteps[svgIndex].svgPath}
              alt="Your browser does not support SVGs"
              width={500}
              height={300}
              layout="responsive"
              className="object-contain"
            />
          </div>
        </div>

        {/* <object
          ref={svgRef}
          type="image/svg+xml"
          data={svgSteps[svgIndex].svgPath}
          className="h-auto w-3/5 rounded-lg bg-gray-200 shadow-xl"
          aria-labelledby="svgAnimation"
          role="img"
        >
          Your browser does not support SVGs
        </object> */}
      </div>
    </div>
  )
}

// export default CodeAnimation;

// import React, { useEffect, useRef, useState } from 'react';
// import { PlayIcon, PauseIcon, StopIcon, RewindIcon, FastForwardIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'; // Importing icons

// const CodeAnimation = () => {
//   const [svgIndex, setSvgIndex] = useState(0);
//   const svgPaths = ['/p2pk-1.svg', '/p2pk-2.svg', '/p2pk-3.svg'];
//   const descriptions = [
//     "Push <pubkey> onto the stack",
//     "Push <pubkey> onto the stack",
//     "Pop two items (pub-key & sign.) & verify ECDSA signature"
//   ];
//   const svgRef = useRef(null);

//   const handlePlayerAction = (action) => {
//     if (svgRef.current && svgRef.current.contentDocument) {
//       const svgElement = svgRef.current.contentDocument.getElementById("p2pk");
//       if (svgElement && svgElement.svgatorPlayer) {
//         // Ensure player is ready before attempting to manipulate it
//         svgElement.svgatorPlayer.ready(() => {
//           // Check the action and apply the corresponding player method
//           switch (action) {
//             case 'play':
//               svgElement.svgatorPlayer.play();
//               break;
//             case 'pause':
//               svgElement.svgatorPlayer.pause();
//               break;
//             case 'stop':
//               svgElement.svgatorPlayer.stop();
//               break;
//             case 'restart':
//               svgElement.svgatorPlayer.restart();
//               break;
//             case 'reverse':
//               svgElement.svgatorPlayer.reverse();
//               break;
//             case 'toggle':
//             case 'togglePlay': // Assuming togglePlay does the same as toggle
//               svgElement.svgatorPlayer.toggle();
//               break;
//             default:
//               console.error('Unsupported action');
//           }
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     // Set up to play animation on component mount and every time svgIndex changes
//     handlePlayerAction('play');

//     return () => {
//       // Clean up: stop animation and destruct player when component unmounts
//       handlePlayerAction('destruct');
//     };
//   }, [svgIndex]); // Add svgIndex to the dependency array to re-run effect when it changes

//   // Function to handle switching SVGs and autoplay
//   const handleSvgSwitch = (direction) => {
//     setSvgIndex(prev => {
//       const newIndex = direction === 'next' ? (prev + 1) % svgPaths.length : (prev - 1 + svgPaths.length) % svgPaths.length;
//       setTimeout(() => handlePlayerAction('play'), 100); // A slight delay to ensure the SVG is loaded

//       return newIndex;
//     });
//   };

//   const handleSvgSelect = (index) => {
//     setSvgIndex(index);  // Update the SVG index
//     setTimeout(() => handlePlayerAction('play'), 100);  // A slight delay to ensure the SVG is loaded
//   };

//   return (
// <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="flex w-full max-w-7xl mx-auto">
//         {/* List of Steps */}
//         <ul className="bg-white shadow-lg p-4 rounded-lg w-1/4">
//           {descriptions.map((desc, index) => (
//             <li key={index}
//                 className={`p-2 transition-colors duration-300 cursor-pointer ${index === svgIndex ? 'bg-blue-100 shadow' : 'hover:bg-blue-50'}`}
//                 onClick={() => handleSvgSelect(index)}>
//               Step {index + 1}: {desc}
//             </li>
//           ))}
//         </ul>

//          {/* SVG Display */}
//          <object
//           ref={svgRef}
//           type="image/svg+xml"
//           data={svgPaths[svgIndex]}
//           className="w-1/2 h-auto shadow-xl rounded-lg mx-4"
//           aria-labelledby="svgAnimation"
//           role="img"
//         >
//           Your browser does not support SVGs
//         </object>
//       </div>

//       {/* Control Buttons */}
//       <div className="flex justify-center space-x-4 mt-4">
//         <button onClick={() => handlePlayerAction('play')} className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           <PlayIcon className="h-5 w-5 mr-2" /> Play
//         </button>
//         <button onClick={() => handlePlayerAction('pause')} className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           <PauseIcon className="h-5 w-5 mr-2" /> Pause
//         </button>
//         <button onClick={() => handlePlayerAction('stop')} className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           <StopIcon className="h-5 w-5 mr-2" /> Stop
//         </button>
//         <button onClick={() => handlePlayerAction('restart')} className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           <RewindIcon className="h-5 w-5 mr-2" /> Restart
//         </button>
//         <button onClick={() => handleSvgSwitch('prev')} className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//           <ArrowLeftIcon className="h-5 w-5 mr-2" /> Prev
//         </button>
//         <button onClick={() => handleSvgSwitch('next')} className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//           <ArrowRightIcon className="h-5 w-5 mr-2" /> Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CodeAnimation;
