import React from 'react';

const TextInput = ({ text, setText }) => {
  return (
    <div className="flex flex-col">
      <label className="leading-loose">Text to speak</label>
      <textarea
        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        placeholder="Enter text here"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
};

export default TextInput;
