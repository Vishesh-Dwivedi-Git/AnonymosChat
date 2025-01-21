export function Footer() {
  return (
    <footer className="bg-opacity-10 backdrop-blur-lg py-8 border-t border-gray-700 font-grotesk">
      <div className="container mx-auto px-4 text-center text-white font-bold">
        <p className="text-lg">&copy; 2025 AnonyChat. All rights reserved.</p>
        <p className="mt-2">Owned by <span className="text-blue-500 font-semibold">Vishesh Dwivedi</span></p>
        <p className="mt-1">
          Contact: 
          <a 
            href="mailto:visheshdwivedi225544@gmail.com" 
            className="text-blue-500 hover:underline ml-1"
          >
            visheshdwivedi225544@gmail.com
          </a>
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <button className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
            Terms of Service
          </button>
          <button className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  )
}
