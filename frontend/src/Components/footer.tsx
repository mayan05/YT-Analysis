function Footer() {
  return (
    // Update Footer.tsx
<footer className="bg-gray-800 py-6 mt-8 border-t border-gray-700">
  <div className="text-center text-white">
    <h1 className="text-xl font-bold mb-4">Contact Me</h1>
    <div className="flex flex-col gap-2">
      <p className="text-gray-300">Mayan Sequeira</p>
      <p className="text-gray-300">mayan.sequeira@gmail.com</p>
      <p className="text-gray-300">+91 8660579551</p>
      <a
        href="https://www.linkedin.com/in/mayan-sequeira/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/mayan05"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        GitHub
      </a>
    </div>
  </div>
</footer>
  );
}

export default Footer;