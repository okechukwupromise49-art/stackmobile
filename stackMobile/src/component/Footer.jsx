import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export  function Footer({ isModalOpen, setIsModalOpen }) {
    const navigate = useNavigate()
    const [value, setValue] = useState("")
    
    

    async function SubmitEvent() {
        try {
            const res = await axios.post("http://localhost:3000/api/login", {
            password: value,
            })
            navigate('/admin')
            console.log(res.data)
        } catch (error) {
            setIsModalOpen(false)
        }

        setValue("")
        }


  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <p className="text-blue-500 text-3xl font-bold">Stack</p>
              <span className="text-2xl font-semibold text-white">Mobile</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Reliable mobile solutions for your everyday needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Products</a></li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Upload (Admin)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Address</p>
                <p className="text-gray-200">Old Banex Plaza wusa 2 Shop bps8b, Abuja, Nigeria</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-gray-200">+234 707 721 4744</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-gray-200">info@stackmobile.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Stack Mobile. All Rights Reserved.
        </div>
      </div>

      {/* Modal - Only render when open */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Access
            </h2>

            <input
              type="password"
              placeholder="Enter Admin Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    onClick={SubmitEvent}>
              Login
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}