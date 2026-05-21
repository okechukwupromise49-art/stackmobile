import { useState, useEffect, useCallback } from "react";
import {Header} from "../component/Header";
import {Footer} from "../component/Footer";
import Logo from "../assets/Logo.jpg";
import axios from "axios";

export  function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fetchProducts = useCallback(async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/details");
        setProducts(res.data.data || []);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);

    const openWhatsApp = (product) => {
      const message = `Hi, I’m interested in the ${product.name} I saw on your website. Please kindly provide more details. Thank you.`;
    window.open(
      `https://wa.me/2347077214744?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div>
      <Header />

      <main className="pt-20 min-h-screen">
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <img
            src={Logo}
            alt="Stack Mobile Logo"
            className="w-48 md:w-64 mb-8"
          />
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to Stack Mobile
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
            Reliable mobile solutions for your everyday needs in Abuja.
          </p>

          <button
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-lg transition-colors"
          >
            Get In Touch
          </button>
        </div>

         {loading ? (
  <div className="mt-10 text-center text-lg text-gray-600">
    Loading products...
  </div>
) : products.length === 0 ? (
  <div className="text-center py-20">
    <p className="text-2xl text-gray-400">No products found</p>
    <p className="text-gray-500 mt-2">
      Try adding some products to your website
    </p>
  </div>
) : (
  <div className="px-4 sm:px-6 lg:px-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
        >
          {/* Image */}
          <div className="relative h-56 sm:h-60 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-3 left-3">
              <span className="text-white text-sm font-medium">
                {product.name}
              </span>
            </div>
          </div>

          {/* Button */}
          <div className="p-4 flex flex-col gap-3">
            <button
              onClick={() => {setIsProductOpen(true)
                setSelectedProduct(product);
              }
              
              }
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      </main>

      <Footer isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {isProductOpen && selectedProduct && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-md"
      onClick={() => {
        setIsProductOpen(false);
        setSelectedProduct(null);
      }}
    />

    {/* MODAL CARD */}
    <div className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl z-10">

      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">
          {selectedProduct.name}
        </h2>

        <p className="text-gray-500 mt-2">
          Contact us to get price and details
        </p>

        <button
          onClick={() => openWhatsApp(selectedProduct)}
          className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          Order on WhatsApp
        </button>

        <button
          onClick={() => {
            setIsProductOpen(false);
            setSelectedProduct(null);
          }}
          className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
          
          
            
         
        
    </div>
      

  );
}