import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-bold">
          Chatbot Admin
        </Link>
        <div className="flex space-x-4">
          <Link href="/faqs" className="hover:text-gray-200">
            FAQs
          </Link>
          <Link href="/conversations" className="hover:text-gray-200">
            Conversations
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
