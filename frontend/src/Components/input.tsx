const Input = () => {
  return (
    // Update Input.tsx
<div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-center text-gray-800">Enter the YouTube URL Here</h1>
  <form className="flex gap-3 mt-4">
    <input
      type="text"
      placeholder="Enter URL"
      className="flex-1 p-3 border border-blue-500 rounded-md outline-none text-gray-800 bg-white placeholder-gray-500 focus:border-blue-600"
    />
    <button
      type="submit"
      className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
    >
      Submit
    </button>
  </form>
</div>
  );
};

export default Input;