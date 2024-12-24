"use client";
import { RootState } from "@/redux/store";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { setLanguage } from "@/redux/Features/languageSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Cart from "./Cart";

interface PropsType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setShowCart }: PropsType) => {
  const cartCount = useSelector(
    (state: RootState) => state.cart?.cartPrdcts?.length ?? 0
  );
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuOpe, setiSMenuOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState("/flags/en.jpg");
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language?.language);
  const { data: session } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
 console.log("userrrrrr",session);
 const [isCartOpen, setIsCartOpen] = useState(false); // Local state to track if the cart is open

 // Toggle cart open/close
 const handleIsCartClick = () => {
   setIsCartOpen(!isCartOpen); // Toggle the cart visibility
   setShowCart(!isCartOpen); // Propagate the state to the parent if necessary
 };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.push(`?q=${value}`);
  };
  const languages = [
    { locale: 'en',  flag:"/flags/en.jpg", name: 'English' },
    { locale: 'tr',  flag:"/flags/tr.png", name: 'Türkçe' },
    { locale: 'rs',  flag:"/flags/rs.jpg", name: 'Rusya' }
  ];
  const handleCartClick = () => {
    setShowCart(true); // Sepet açma fonksiyonu
  };
  const handleLanguageChange = (locale: string, flag: string) => {
    dispatch(setLanguage(locale));
    setSelectedFlag(flag);
    setIsOpen(false);
  };

  const handleLogin = () => router.push("/login");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-gray-700 text-2xl font-bold">
          <span className="text-blue-500">My</span>Shop
        </div>
       <div>{session?.user?.name}??mio</div>
      
        {/* Search */}
        <div className="hidden md:flex relative w-1/2 lg:w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-md border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute right-4 top-2 text-gray-400" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
       
        <div className="relative">
      {/* Seçili bayrağın gösterilmesi */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <img src={selectedFlag} alt="Flag" style={{ width: '30px', height: '20px' }} />
      </div>

      {/* Menü açıldığında diğer bayrakların gösterilmesi */}
      {isOpen && (
        <div className="flex flex-col absolute top-8 -right-10">
          {languages.map((language) => (
            <button 
              key={language.locale} 
              onClick={() => handleLanguageChange(language.locale, language.flag)} 
              className="flex items-center space-x-2 p-2"
            >
              <img 
                src={language.flag} 
                alt={`${language.name} Flag`} 
                style={{ width: '30px', height: '20px' }} 
              />
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
          <div className="relative" onClick={() =>handleIsCartClick()}>
            <ShoppingCartIcon className="w-6 h-6 cursor-pointer hover:text-blue-500 transition" />
            <div className="absolute top-[-10px] right-[-10px] bg-red-600 w-5 h-5 rounded-full text-white text-xs grid place-items-center">
              {cartCount}
            </div>
           {isCartOpen? <Cart setShowCart={setShowCart} />:<div/>}
          </div>

          {!session ? (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          ) : (
            <img
              src="/profil.png"
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setiSMenuOpen(!isMenuOpe)}
            />
          )}
        </div>
        
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {isMenuOpe&&(
         <div className="relative">
         <div className= "  absolute right-0 flex flex-col items-center gap-y-3 py-5 justify-center w-50  bg-white shadow-lg">
       

        <div className="text-blue-900">{session?.user?.name}</div>
        <div className="text-blue-900">{session?.user?.email}</div>

          <div
            className="flex items-center w-20"
            onClick={() =>{}}
          >
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="text-blue-900"> ({cartCount})</span>
          </div>
          {!session ? (
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-[15px]  text-blue-900 rounded-sm hover:bg-blue-900 transition w-15 text-center"
            >
              Login
            </button>
          ) : (
            <div onClick={()=>router.push("/account")} className="flex items-center space-x-3">
              <img 

                src="/profil.png"
                alt="User"
                className="w-10 h-10 rounded-full bg-blue-900"
              />
            </div>
          )}
          <div className="text-blue-900" onClick={()=>logout()}>Log Out</div>
        </div>
       </div>
      )}
      {/* Mobile Dropdown */}
      {menuOpen && (
       <div className="relative">
         <div className= " md:hidden absolute right-0 flex flex-col items-center gap-y-3 py-5 justify-center w-20  bg-white shadow-lg">
       

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center w-20 p-2"
          >
            <Image
              src={selectedFlag}
              alt="Selected Flag"
              width={24}
              height={16}
              
            />
           
          </button>

          <div
            className="flex items-center w-20"
            onClick={() =>{}}
          >
            <ShoppingCartIcon className="w-6 h-6" />
            <span> ({cartCount})</span>
          </div>
          {!session ? (
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-[15px] bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition w-15 text-center"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <img
                src="/profil.png"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            </div>
          )}
        </div>
       </div>
      )}
    </nav>
  );
};

export default NavBar;
