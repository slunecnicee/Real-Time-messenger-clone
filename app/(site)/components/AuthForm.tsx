"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/input";
import { useCallback, useEffect, useState } from "react";
import {  useForm,FieldValues,SubmitHandler } 
from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle  } from 'react-icons/bs';
import axios from "axios";
import {toast} from 'react-hot-toast';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant ='LOGIN'|'REGISTER';
const AuthForm = () => {

const router=useRouter();
const session=useSession();
const [varient,setVarient]=useState<Variant>('LOGIN');
const [isLoading,SetisLoading]=useState(false);

useEffect(()=>{
    if(session?.status==='authenticated'){
        router.push('/users');
    }
},[session?.status,router]);



const toggleVarient=useCallback(()=>{
    if(varient==='LOGIN'){
        setVarient('REGISTER');
    }else{
        setVarient('LOGIN');
    }
},[varient]);

const {register,
handleSubmit,
formState:{
    errors
}}=useForm<FieldValues>({
    defaultValues:{
        name:'',
        email:'',
        password:'',
    }
});

const onSubmit:SubmitHandler<FieldValues>=(data)=>{
SetisLoading(true);

if (varient === 'REGISTER') {
    axios.post('/api/register', data)
    .then(() => signIn('credentials', {
      ...data,
      redirect: false,
    }))
    .then((callback) => {
      if (callback?.error) {
        toast.error('Invalid credentials!');
      }

      if (callback?.ok) {
        router.push('/users')
      }
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => SetisLoading(false))
  }

if(varient==='LOGIN'){
    signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/users')
        }
      })
      .finally(() => SetisLoading(false))
    }
  }



const socialAction =(action:string)=>{
SetisLoading(true);
signIn(action,{redirect:false})
.then((callback)=>{
    if(callback?.error){
        toast.error('invalid credentials');
    }
    if(callback?.ok && !callback?.error){
        toast.success('successfully logged in');
    }
})
.finally(()=>SetisLoading(false));
}

    return ( 
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          className="
          bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
          "
        >
          <form 
            className="space-y-6" 
            onSubmit={handleSubmit(onSubmit)}
          >
            {varient === 'REGISTER' && (
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="name" 
                label="Name"
              />
            )}
            <Input 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email" 
              label="Email address" 
              type="email"
            />
            <Input 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="password" 
              label="Password" 
              type="password"
            />
            <div>
              <Button disabled={isLoading} fullWidth type="submit">
                {varient === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button>
            </div>
          </form>
  
          <div className="mt-6">
            <div className="relative">
              <div 
                className="
                  absolute 
                  inset-0 
                  flex 
                  items-center
                "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
  
            <div className="mt-6 flex gap-2">
              <AuthSocialButton 
                icon={BsGithub} 
                onClick={() => socialAction('github')} 
              />
              <AuthSocialButton 
                icon={BsGoogle} 
                onClick={() => socialAction('google')} 
              />
            </div>
          </div>
          <div 
            className="
              flex 
              gap-2 
              justify-center 
              text-sm 
              mt-6 
              px-2 
              text-gray-500
            "
          >
            <div>
              {varient === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'} 
            </div>
            <div 
             onClick={toggleVarient}
              className="underline cursor-pointer"
            >
              {varient === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default AuthForm;