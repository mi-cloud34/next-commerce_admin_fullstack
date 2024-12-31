"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader, Lock, Mail,User,Eye, EyeOff, } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Header from "@/app/admin/(components)/Header"; // Adjust the path as necessary
import Input from "../general/input";
import PasswordStrengthMeter from "../general/passwordStrengtMetter";
import Link from "next/link";
import { Button } from "@mui/material";


interface FormData {
  name: string;
  email: string;
  password: string;
  surname: string;
}

const RegisterClient = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("")
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
	const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
 */
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/register", {
        name: name,
        surname:surname,
        email: email,
        password: password,
      });

      console.log("Response:", res.data);
      if (res.status == 200) {
        console.log("işlem başarılı", res.data);
        setIsLoading(true);
        router.push("/verify"); // Doğrulama sayfasına yönlendir.
      } else {
        setError(res.data.error);
        setMessage("");
      }
    } catch (e:any) {
      const errorMessage =
        e.response?.data?.error ||
        e.message ||
        "Beklenmeyen bir hata oluştu."; // Yedek mesaj

      toast.error(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    const response = await signIn("google", { redirect: false });
    console.log("resssssssssss:", response);

    if (response?.ok) {
      toast.success("Google ile giriş başarılı.");
      router.push("/"); // Başarılıysa ana sayfaya yönlendirme
    } else {
      toast.error("Google ile giriş başarısız.");
    }
  };
 return (
  <div className="flex items-center justify-center min-h-screen bg-white">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='max-w-md w-full bg-white bg-opacity-50 border border-indigo-500 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden'
  >
    <div className='p-8'>
      <h2 className='text-3xl font-bold mb-6 text-center  bg-gradient-to-r from-indigo-400 to-indigo-500 text-transparent bg-clip-text'>
        Create Account
      </h2>

      <form className="space-y-6"onSubmit={handleSubmit}>
      <Input
						icon={User}
						type='text'
						placeholder='Full Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
           <Input
						icon={User}
						type='text'
						placeholder='Surname Name'
						value={surname}
						onChange={(e) => setSurName(e.target.value)}
					/>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				 <div className="relative">
              <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
        <PasswordStrengthMeter password={password} />

       
					<motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-indigo-600
						hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
					</motion.button>
      </form>
    </div>
    <div className='px-8 py-4 bg-white bg-opacity-50 flex justify-center'>
      <p className='text-sm text-black'>
        Already have an account?{" "}
        <Button onClick={()=>router.push("/login")} className='text-indigo-400 hover:underline'>
          Login
        </Button>
      </p>
    </div>
  </motion.div>
  </div>
);
};


export default RegisterClient;