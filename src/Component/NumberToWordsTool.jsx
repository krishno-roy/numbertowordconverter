import React, { useState, useEffect } from "react";
import { toWords } from "number-to-words";
import { IoIosCopy } from "react-icons/io";
import { FaPlay } from "react-icons/fa";

const NumberToWordsTool = () => {
  const [numberInput, setNumberInput] = useState("");
  const [rawNumber, setRawNumber] = useState("");
  const [words, setWords] = useState("");
  const [currency, setCurrency] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  const currencyLabels = {
    usd: "dollars",
    eur: "euros",
    gbp: "pounds",
    inr: "rupees",
    bdt: "Taka",
  };

  const formatWithCommas = (value) => {
    const digitsOnly = value.replace(/[^\d]/g, "");
    return digitsOnly ? Number(digitsOnly).toLocaleString("en-IN") : "";
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const cleaned = inputValue.replace(/[^\d]/g, ""); // keep only numbers
    setRawNumber(cleaned);
    setNumberInput(formatWithCommas(cleaned));
  };

  useEffect(() => {
    if (!rawNumber || isNaN(rawNumber)) {
      setWords("");
      setCurrency("");
      setCharCount(0);
      setWordCount(0);
      return;
    }

    const num = parseInt(rawNumber, 10);
    const wordForm = toWords(num);
    const currencyForm = `${wordForm} ${currencyLabels[selectedCurrency]}`;

    setWords(wordForm);
    setCurrency(currencyForm);
    setCharCount(wordForm.length);
    setWordCount(wordForm.trim().split(/\s+/).length);
  }, [rawNumber, selectedCurrency]);

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleTransform = (type) => {
    let transformed = words;
    if (type === "uppercase") transformed = words.toUpperCase();
    else if (type === "lowercase") transformed = words.toLowerCase();
    else if (type === "capitalize")
      transformed = words
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

    setWords(transformed);
    setCurrency(`${transformed} ${currencyLabels[selectedCurrency]}`);
  };

  return (
    <section>
      <div className="container mx-auto pt-5 px-4">
        <div className="py-4 space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
            Convert Number to Words and Currency
          </h2>
          <p className="text-white">
            Type a number below (e.g. 100000 or 1,00,000) to get the result in
            words and currency.
          </p>
        </div>

        {/* Number Input */}
        <div className="mb-6">
          <div className="bg-black text-white p-3 flex justify-between items-center">
            <p>Number</p>
            <div className="flex gap-3 text-xl cursor-pointer">
              <FaPlay onClick={() => speakText(numberInput)} />
              <IoIosCopy onClick={() => copyText(numberInput)} />
            </div>
          </div>
          <textarea
            rows="2"
            value={numberInput}
            onChange={handleInputChange}
            className="bg-gray-200/25 text-white w-full p-4 focus:outline-none rounded"
            placeholder="Enter number like 100000 or 1,00,000..."
          ></textarea>
        </div>

        {/* Output */}
        {rawNumber.trim() !== "" && !isNaN(rawNumber) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Number in Words */}
            <div>
              <div className="bg-black text-white p-3 flex justify-between items-center">
                <p>Number in Words</p>
                <div className="flex gap-3 text-xl cursor-pointer">
                  <FaPlay onClick={() => speakText(words)} />
                  <IoIosCopy onClick={() => copyText(words)} />
                </div>
              </div>
              <textarea
                rows="4"
                value={words}
                readOnly
                className="bg-gray-200/25 text-white w-full p-4 focus:outline-none rounded"
              ></textarea>
            </div>

            {/* Currency in Words */}
            <div>
              <div className="bg-black text-white p-3 flex justify-between items-center">
                <p>Currency in Words</p>
                <div className="flex gap-3 text-xl cursor-pointer">
                  <FaPlay onClick={() => speakText(currency)} />
                  <IoIosCopy onClick={() => copyText(currency)} />
                </div>
              </div>
              <textarea
                rows="4"
                value={currency}
                readOnly
                className="bg-gray-200/25 text-white w-full p-4 focus:outline-none rounded"
              ></textarea>
            </div>
          </div>
        )}

        {/* Counts */}
        {rawNumber.trim() !== "" && !isNaN(rawNumber) && (
          <div className="space-x-6 text-lg text-white mt-6">
            <span>
              <strong>Character Count:</strong> {charCount}
            </span>
            <span>
              <strong>Word Count:</strong> {wordCount}
            </span>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center py-5 px-3 focus:outline-none">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="p-2 rounded bg-black text-white focus:outline-none"
          >
            <option value="usd">USD - US Dollar</option>
            <option value="eur">EUR - Euro</option>
            <option value="gbp">GBP - British Pound</option>
            <option value="inr">INR - Indian Rupee</option>
            <option value="bdt">BDT - Taka</option>
          </select>

          <button
            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() =>
              copyText(`Number in Words: ${words}\nCurrency: ${currency}`)
            }
          >
            Copy All
          </button>
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => handleTransform("uppercase")}
          >
            Uppercase
          </button>
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => handleTransform("lowercase")}
          >
            Lowercase
          </button>
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => handleTransform("capitalize")}
          >
            Capitalize
          </button>
        </div>
      </div>
    </section>
  );
};

export default NumberToWordsTool;
