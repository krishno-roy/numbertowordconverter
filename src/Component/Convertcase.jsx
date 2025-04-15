import React, { useState, useEffect } from "react";

const Convertcase = () => {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    setCharCount(text.length);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
    setSentenceCount(
      text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length
    );
    setLineCount(text.split("\n").length);
  }, [text]);

  const handleSentenceCase = () => {
    const sentenceCase = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setText(sentenceCase);
  };

  const handleLowerCase = () => {
    setText(text.toLowerCase());
  };

  const handleUpperCase = () => {
    setText(text.toUpperCase());
  };

  const handleCapitalizedCase = () => {
    const capitalized = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(capitalized);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <section>
      <div className="container mx-auto pt-20 px-4">
        <div className="py-4 space-y-4">
          <h2 className="text-2xl font-semibold">
            Accidentally left the caps lock on and typed something, but can't be
            bothered to start again and retype it all?
          </h2>
          <p>
            Simply enter your text and choose the case you want to convert it
            to.
          </p>
        </div>
        <textarea
          name="text"
          id="text"
          rows="10"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-100 border-2 border-black w-full p-4"
          placeholder="Enter your text here..."
        ></textarea>
        <div className="flex flex-wrap gap-4 py-5">
          <button
            className="py-2 px-6 bg-gray-200 hover:bg-black hover:text-white"
            onClick={handleSentenceCase}
          >
            Sentence case
          </button>
          <button
            className="py-2 px-6 bg-gray-200 hover:bg-black hover:text-white"
            onClick={handleLowerCase}
          >
            lower case
          </button>
          <button
            className="py-2 px-6 bg-gray-200 hover:bg-black hover:text-white"
            onClick={handleUpperCase}
          >
            UPPER CASE
          </button>
          <button
            className="py-2 px-6 bg-gray-200 hover:bg-black hover:text-white"
            onClick={handleCapitalizedCase}
          >
            Capitalized Case
          </button>
          <button
            className="py-2 px-6 bg-gray-200 hover:bg-black hover:text-white"
            onClick={handleCopy}
          >
            Copy to Clipboard
          </button>
          <button
            className="py-2 px-6 bg-gray-200 hover:bg-black hover:text-white"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        <div className="space-x-6 text-lg">
          <span>
            <strong>Character Count:</strong> {charCount}
          </span>
          <span>
            <strong>Word Count:</strong> {wordCount}
          </span>
          <span>
            <strong>Sentence Count:</strong> {sentenceCount}
          </span>
          <span>
            <strong>Line Count:</strong> {lineCount}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Convertcase;
