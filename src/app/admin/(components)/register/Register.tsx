"use client"
import { signIn, SignInResponse } from "next-auth/react"
import Link from "next/link"
import { FaGoogle } from "react-icons/fa"
import Button from "@/app/(ecommerce)/components/general/Button"
import Input from "@/app/(ecommerce)/components/general/Input"
import { User } from "next-auth"
import toast from "react-hot-toast"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import axios from "axios"
import Heading from "@/app/(ecommerce)/components/general/Heading"
import AuthContainer from "@/app/(ecommerce)/components/containers/AuthContainer"
interface RegisterClientProps{
    currentUser?: User | null | undefined
  }
const RegisterClient:React.FC<RegisterClientProps> = ({currentUser}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>()

      const onSubmit: SubmitHandler<FieldValues> =async (data) =>{
        await  axios.post('/api/users/register', data).then((res) => {
               
             console.log("dataaaa",res);
             
              if(res.status==200){
                  router.push('/admin/dashboard')
                  router.refresh();
                  toast.success('Login İşlemi Basarılı...')
              }
          }).catch((e)=>{
             toast.error(e);
          })
        }
    
        useEffect(() => {
           if(currentUser){
            router.push('/admin/dashboard/')
            router.refresh();
           }},[currentUser,router]);
  return (
    <AuthContainer>
         <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
              <Heading text="Register" center/>
              <Input placeholder="Ad" type="text" id="name" register={register} errors={errors} required/>
              <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required/>
              <Input placeholder="Parola" type="password" id="password" register={register} errors={errors} required/>
              <Button text="Kayıt Ol" onClick={handleSubmit(onSubmit)}/>
              <div className="text-center my-2 text-sm text-red-500">Daha Önceden Kayıt Olduysan <Link className="underline " href="/admin/login">buraya tıkla</Link></div>
              <div className="text-center my-2 font-bold text-lg">OR</div>
              <Button text="Google İle Üye Ol" icon={FaGoogle} outline  onClick={() => signIn('google')}/>
         </div>
    </AuthContainer>
  )
}

export default RegisterClient