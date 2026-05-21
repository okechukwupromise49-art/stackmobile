export function Header() {
  const openWhatsApp = () => {
    const message =
      "Hi, I’m interested in your products on your website. Please kindly provide more details. Thank you.";

    window.open(
      `https://wa.me/2347077214744?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-1">
        <p className="text-blue-600 text-3xl font-bold">Stack</p>
        <span className="text-2xl font-semibold text-gray-800">Mobile</span>
      </div>

      {/* Contact Button */}
      <button
        onClick={openWhatsApp}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                   text-white font-medium rounded-lg transition-colors duration-200"
      >
        Contact Us
      </button>
    </header>
  );
}