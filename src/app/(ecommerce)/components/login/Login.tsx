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
import { useEffect } from "react";
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "@/redux/Features/userSlice";
interface LoginClientProps{
  currentUser?: User | null | undefined
}
const LoginClient =  () =>{
  const dispatch = useDispatch();
  const router = useRouter();
  /* useEffect(() => {
    const fetchUser = async () => {
     
     // console.log("mesut5555555", user);
      
      if (currentUser) {
        console.log("mesutttttttttt",currentUser);
        
        dispatch(setUser(currentUser));
       
      }
    
    };

    fetchUser();
  }, [dispatch]); */
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> =async (data) =>{
 /*   await  axios.post('/api/users/login', data).then((res) => {
           
         console.log("dataaaa",res);
         
          if(res.status==200){
              router.push('/')
              router.refresh();
              toast.success('Login İşlemi Basarılı...')
          }
      }).catch((e)=>{
         toast.error(e);
      })  */
          signIn('credentials', {
          ...data,
          redirect: false
      }).then((callback) => {
          if(callback?.ok){
              router.push('/')
              router.refresh();
              toast.success('Login İşlemi Basarılı...')
          }

          if(callback?.error){
              toast.error(callback.error)
          }
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
          <div className="flex justify-center">
          <Header name="Login Acount"/>
          </div>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email address
                </label>
                <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required/>
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
                <Input placeholder="Parola" type="password" id="password" register={register} errors={errors} required/>
                </div>
              </div>

              
              <span
                onClick={() => {
                  router.push("/forgetpassword");
                }}
                className="flex justify-end font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer mt-10"
              >
                Forget Password ?
              </span>
            

              <button className="bg-indigo-600 text-white w-full flex justify-center items-center text-2xl rounded-tl-3xl h-[45px] " onClick={handleSubmit(onSubmit)}>
               Login </button>
            </form>

            <p className="mt-10 text-center text-blue-800 text-sm">
              Do you have an account?{" "}
              <span
                onClick={() => {
                  router.push("/register");
                }}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginClient;