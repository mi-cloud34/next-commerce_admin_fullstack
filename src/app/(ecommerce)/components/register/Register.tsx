"use client"
import axios from "axios";
import { User } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../general/Input";
import Button from "../general/Button";
import { FaGoogle } from "react-icons/fa";
import Header from "@/app/admin/(components)/Header";
import { useEffect, useState } from "react";

interface RegisterClientProps{
  currentUser?: User | null | undefined
}
interface FormData{
    name:string;
    email:string;
    password:string;
    surname:string;
}
const RegisterClient =  () =>{
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const {
      register,
      handleSubmit,
      watch,
    
      formState: { errors },
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> =async (data) =>{
    await  axios.post('/api/users/register', {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password
  }).then((res) => {
           
      console.log("Response:", res.data);
      if (res.status==200) {
         
        console.log("işlem başarılı", res.data);
            
          router.push("/verify"); // Doğrulama sayfasına yönlendir.
      
      } else {
        setError(res.data.error);
        setMessage("");
      }
      }).catch((e)=>{
        const errorMessage =
        e.response?.data?.error || // Backend'den dönen hata
        e.message || // Axios'un ürettiği genel hata
        "Beklenmeyen bir hata oluştu."; // Yedek mesaj
  
      toast.error(errorMessage);
        
      })
    }
  
    const handleGoogleSignIn = async () => {
      const response = await signIn('google', { redirect: false });
    console.log("resssssssssss:",response);
    
      if (response?.ok) {
        toast.success("Google ile giriş başarılı.");
        router.push('/') // Başarılıysa ana sayfaya yönlendirme
      } else {
        toast("Google ile giriş başarısız.");
      }
    }
  return (
    <div className="flex justify-center mt-8">
      <div style={{ minWidth: "30%" }}>
        <div className="flex min-h-full shadow-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center">
              <Image src="/login.gif" height={250} width={250} alt="login" />
            </div>
         <div className="flex justify-center items-center"> <Header name="Create Acount" /></div>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
            <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 "
                >
                  Name
                </label>
                <input
                    id="name"
                   
                    type="name"
                    autoComplete="name"
                    {...register("name", {
                      
                      })} required
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
              {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>)}
              </div>
              <div>
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium leading-6 "
                >
                  SurName
                </label>
                <input
                    id="surname"
                  
                    type="surname"
                    autoComplete="surname"
                    {...register("surname", {
                       
                      })} 
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
               {errors.surname && (
                    <p className="text-sm text-red-500">{errors.surname.message}</p>)}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email address
                </label>
                <input
                    id="email"
                   
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                        required: "Lütfen email adresinizi giriniz.",
                        pattern: {
                          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Geçerli bir email adresi giriniz.",
                        },
                      })} 
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  /> {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
              
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                <input
          id="password"
          type="password"
          {...register("password", {
            required: "Lütfen şifrenizi giriniz.",
            minLength: {
              value: 6,
              message: "Şifre en az 6 karakter olmalıdır.",
            },
          })} 
          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
                </div>
              </div>

         

              <button className="uppercase bg-indigo-600 text-white w-full flex justify-center items-center text-2xl rounded-tl-3xl h-[45px] " onClick={handleSubmit(onSubmit)}>
              Register </button>
             
            </form>

            <p className="mt-10 text-center text-blue-800 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => {
                  router.push("/login");
                }}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
           
            <div className="flex justify-center items-center mt-5">  <button  className="bg-indigo-600 text-white w-1/2 flex justify-center items-center  " onClick={() => handleGoogleSignIn()}>
                <FaGoogle className="my-1" size={35}/>
            </button> </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterClient;