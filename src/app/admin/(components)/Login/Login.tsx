"use client"
import { signIn, SignInResponse } from "next-auth/react"
import Link from "next/link"
import { FaGoogle } from "react-icons/fa"
import { User } from "next-auth"
import toast from "react-hot-toast"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import axios from "axios"
import Heading from "@/app/(ecommerce)/components/general/Heading"
import Input from "@/components/ECommerce/general/Input"
import Button from "@/components/ECommerce/general/Button"
import AuthContainer from "@/app/(ecommerce)/components/containers/AuthContainer"
interface LoginClientProps{
    currentUser?: User | null | undefined
  }
const LoginClient:React.FC<LoginClientProps> =  ({currentUser}) =>{

  const router = useRouter();
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> =async (data) =>{
    await  axios.post('/admin/api/users/login', data).then((res) => {
           
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
    const handleGoogleSignIn = async () => {
      const response = await signIn('google', { redirect: false });
    
      if (response?.ok) {
        toast.success("Google ile giriş başarısız.");
        router.push('/admin/dashboard/') // Başarılıysa ana sayfaya yönlendirme
      } else {
        toast("Google ile giriş başarısız.");
      }}

    useEffect(() => {
       if(currentUser){
        router.push('/admin/dashboard/')
        router.refresh();
       }
    }, [])
    return   <AuthContainer>
    <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
         <Heading text="Login" center/>
         <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required/>
         <Input placeholder="Parola" type="password" id="password" register={register} errors={errors} required/>
         <Button text="Giriş Yap" onClick={handleSubmit(onSubmit)}/>
          <div className="text-center my-2 text-sm text-red-500">Daha Önce Kayıt Olmadıysa <Link className="underline " href="/admin/register">buraya tıkla</Link></div>
         <div className="text-center my-2 font-bold text-lg">OR</div>
         <Button text="Google İle Giriş Yap" icon={FaGoogle} outline onClick={() => handleGoogleSignIn()}/>
    </div>
</AuthContainer>
}
export default LoginClient;