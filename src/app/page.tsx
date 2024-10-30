"use client";
import { useState } from 'react';
import { generatePrivateKey, generateBTCAddress } from '../utils/bitcoinUtilss'; // Importa las funciones desde utils
import copy from '../images/copy.svg';
import blockchain from '../images/blockchain.svg';
import btc from '../images/Bitcoin.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';

const BTCPage = () => {
  const [inputText, setInputText] = useState('');
  const [BTCAddress, setBTCAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [addressType, setAddressType] = useState('P2PKH'); // Estado para el tipo de dirección

  // Genera clave y dirección BTC cada vez que cambia el texto
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    if (text) {
      generateAddress(text); // Llama a la función para generar la dirección
    } else {
      setBTCAddress('');
      setPrivateKey('');
    }
  };

  // Función para generar dirección y clave BTC
  const generateAddress = (text: string) => {
    const privateKeyHex = generatePrivateKey(text); // Genera la clave privada
    setPrivateKey(privateKeyHex);

    let btcAddress = '';

    switch (addressType) {
      case 'P2PKH':
        btcAddress = generateBTCAddress(privateKeyHex, 'P2PKH');
        break;
      case 'BECH32':
        btcAddress = generateBTCAddress(privateKeyHex, 'BECH32');
        break;
      default:
        throw new Error('Tipo de dirección no soportado');
    }

    setBTCAddress(btcAddress);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center font-hacker justify-center">
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 w-full max-w-md items-center">
        <div className="flex flex-col items-center mb-6">
          <Image src={btc.src} alt="Bitcoin Logo" width={28} height={28} />
          <h1 className="text-3xl font-bold text-gray-800 text-center">Bitcoin Wallet Generator</h1>
        </div>

        <div className="w-full mb-4">
          <div className='flex flex-fil text-center justify-between'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insert Text:</label>
            <div className="flex items-center mb-4">
            <button
              className={`py-1 px-3 text-xs rounded-l-lg transition duration-200 ${addressType === 'P2PKH' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
              onClick={() => setAddressType('P2PKH')}
            >
              A
            </button>
            <button
              className={`py-1 px-3  text-xs rounded-r-lg transition duration-200 ${addressType === 'BECH32' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
              onClick={() => setAddressType('BECH32')}
            >
              b
            </button>
          </div>
        </div>
          <textarea
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 h-24 focus:ring-blue-500 text-black text-sm"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text here"
          />
        </div>

        {/* Selector de tipo de dirección */}



        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-1 hover:bg-blue-700 transition w-64 active:scale-95 duration-200"
          onClick={() => generateAddress(inputText)} // Llama a la función para generar la dirección
        >
          GENERATE WALLET
        </button>

        <div className="w-full mt-6">
          <div className="flex items-center justify-start mb-2">
            <label className="text-sm font-medium text-gray-700">BTC Address:</label>
            <a
              className="p-2 rounded-lg hover:bg-gray-300 transition duration-200 active:scale-95"
              href={`https://www.blockchain.com/explorer/addresses/btc/${BTCAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={blockchain.src} alt="Blockchain" width={20} height={20} />
            </a>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <textarea
              className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 text-black"
              readOnly
              value={BTCAddress}
            />
            <button
              className="bg-gray-200 py-1 px-2 rounded-lg hover:bg-gray-300 transition duration-200 active:scale-95"
              onClick={() => copyToClipboard(BTCAddress)}
            >
              <Image src={copy.src} alt="Copy" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="w-full mt-6">
          <div className="flex items-center justify-start mb-2">
            <label className="text-sm font-medium text-gray-700">Private Key:</label>
            <button
              className="p-1 rounded-xl hover:bg-gray-300 transition duration-200 active:scale-90 focus:outline-none"
              onClick={() => setShowPrivateKey(!showPrivateKey)}
            >
              {showPrivateKey ? <FaEye className="text-black" /> : <FaEyeSlash className="text-black" />}
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <textarea
              className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 text-black"
              readOnly
              value={showPrivateKey ? privateKey : '*'.repeat(privateKey.length)}
            />
            <button
              className="bg-gray-200 py-1 px-2 rounded-lg hover:bg-gray-300 transition duration-200 active:scale-95"
              onClick={() => copyToClipboard(privateKey)}
            >
              <Image src={copy.src} alt="Copy" width={20} height={20} />
            </button>
          </div>
        </div>
        <div
            className="flex bg-gray-200 items-center space-x-1 rounded-lg p-1 cursor-pointer transition duration-200"
            onClick={() => copyToClipboard("0x3d90Eb79C1e753Ca51D1447791C07e7CcC219e5C")}
          >
            <span className="text-gray-700 text-xs transition duration-200 active:scale-95">0x3d90Eb79C1e753Ca51D1447791C07e7CcC219e5C</span>
            <button
              className="p-2 rounded-lg transition duration-200 active:scale-90 focus:outline-none"
              aria-label="Copy to clipboard"
            >
              <Image src={copy.src} alt="Copy" width={20} height={20} />
            </button>
          </div>
      </div>
    </div>
  );
};

export default BTCPage;