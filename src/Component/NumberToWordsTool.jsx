import React, { useState, useEffect } from "react";
import { IoIosCopy } from "react-icons/io";
import { FaPlay } from "react-icons/fa";

const NumberToWordsTool = () => {
  const [numberInput, setNumberInput] = useState("");
  const [words, setWords] = useState("");
  const [currency, setCurrency] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("inr");

  const currencyLabels = {
    usd: "dollars",
    eur: "euros",
    gbp: "pounds",
    inr: "rupees",
    bdt: "taka",
  };

  // Format number in Indian style (1,00,000)
  const formatIndianNumber = (numStr) => {
    let lastThree = numStr.slice(-3);
    let otherNumbers = numStr.slice(0, -3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  };

  // Convert number to Indian number system words
  const convertToIndianWords = (num) => {
    const a = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const b = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    if ((num = num.toString()).length > 9) return "overflow";

    let n = ("000000000" + num).substr(-9).match(/.{1,2}/g);
    let str = "";
    str +=
      n[0] != 0
        ? (a[Number(n[0])] || b[n[0][0]] + " " + a[n[0][1]]) + " crore "
        : "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " lakh "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " thousand "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " hundred "
        : "";
    str +=
      n[4] != 0
        ? (str != "" ? "and " : "") +
          (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]])
        : "";
    return str.trim();
  };

  useEffect(() => {
    // Clean up the input, remove commas, and trim spaces
    let cleanInput = numberInput.replace(/,/g, "").trim();

    if (!cleanInput || isNaN(cleanInput)) {
      setWords("");
      setCurrency("");
      setCharCount(0);
      setWordCount(0);
      return;
    }

    // Format the number in Indian style with commas
    const formattedInput = formatIndianNumber(cleanInput);
    setNumberInput(formattedInput);

    const num = parseInt(cleanInput);
    const wordForm = convertToIndianWords(num);
    const currencyForm = `${wordForm} ${currencyLabels[selectedCurrency]}`;

    setWords(wordForm);
    setCurrency(currencyForm);
    setCharCount(wordForm.length);
    setWordCount(wordForm.split(/\s+/).length);
  }, [selectedCurrency, numberInput]);

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
            Type a number below to get the result in words and currency.
          </p>
        </div>

        <div className="mb-6">
          <div className="bg-black text-white p-3 flex justify-between items-center">
            <p>Number</p>
            <div className="flex gap-3 text-xl cursor-pointer">
              <FaPlay onClick={() => speakText(numberInput)} />
              <IoIosCopy onClick={() => copyText(numberInput)} />
            </div>
          </div>
          <input
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            className="bg-gray-200/25 text-white w-full p-4 focus:outline-none rounded"
            placeholder="Enter number here..."
          />
        </div>

        {numberInput.trim() !== "" &&
          !isNaN(numberInput.replace(/[^0-9]/g, "")) && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-x-6 text-lg text-white mt-6">
                <span>
                  <strong>Character Count:</strong> {charCount}
                </span>
                <span>
                  <strong>Word Count:</strong> {wordCount}
                </span>
              </div>
            </>
          )}

        <div className="flex flex-wrap gap-4 items-center py-5 px-3">
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
