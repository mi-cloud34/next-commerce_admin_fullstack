"use client"
import Link from "next/link";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.div
    //initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
    transition={{ duration: 1.5, ease: "easeInOut" }}
  >
    <footer className="bg-blue-600 text-white  p-2">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">BrandName</h2>
          <p className="text-sm text-white">
            Your trusted partner in e-commerce. Discover premium products with exceptional service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-sm text-white hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-sm text-white hover:text-white transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-white hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-sm text-white hover:text-white transition">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/support" className="text-sm text-white hover:text-white transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-sm text-white hover:text-white transition">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-sm text-white hover:text-white transition">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-white hover:text-white transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-white">
            <strong>Email:</strong> support@brandname.com
          </p>
          <p className="text-sm text-white">
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
          <p className="text-sm text-white">
            <strong>Address:</strong> 123 Main Street, City, Country
          </p>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-white transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.6 0 .005.6.005 1.335v21.33C.005 23.4.6 24 1.325 24h11.49v-9.293H9.847v-3.622h2.968V8.413c0-2.93 1.792-4.523 4.407-4.523 1.253 0 2.331.093 2.646.135v3.073h-1.817c-1.426 0-1.7.677-1.7 1.67v2.186h3.395l-.442 3.622h-2.953V24h5.78c.725 0 1.32-.6 1.32-1.335V1.335C24 .6 23.4 0 22.675 0z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-white transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.833.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.951.566-2.005.977-3.127 1.2-.896-.957-2.173-1.555-3.59-1.555-2.717 0-4.92 2.204-4.92 4.921 0 .386.045.762.127 1.122-4.087-.205-7.719-2.162-10.148-5.135-.423.725-.666 1.566-.666 2.465 0 1.701.868 3.198 2.186 4.078-.805-.026-1.563-.247-2.23-.616v.062c0 2.377 1.693 4.364 3.946 4.815-.413.112-.849.171-1.296.171-.317 0-.626-.031-.928-.089.626 1.956 2.444 3.381 4.6 3.423-1.685 1.319-3.808 2.105-6.114 2.105-.398 0-.79-.024-1.175-.069 2.18 1.398 4.768 2.214 7.548 2.214 9.058 0 14.01-7.505 14.01-14.01 0-.213-.005-.425-.015-.636.961-.695 1.797-1.56 2.457-2.548l-.047-.02z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-white transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5c-6.627 0-12 5.373-12 12 0 5.991 4.388 10.953 10.125 11.847v-8.387h-3.047v-3.46h3.047v-2.633c0-3.019 1.791-4.687 4.529-4.687 1.312 0 2.688.235 2.688.235v2.963h-1.512c-1.491 0-1.953.928-1.953 1.874v2.248h3.328l-.531 3.46h-2.797v8.387c5.737-.894 10.125-5.856 10.125-11.847 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-white mt-4 md:mt-0">
          © 2024 BrandName. All rights reserved.
        </p>
      </div>
    </footer>
    </motion.div>
  );
};

export default Footer;
