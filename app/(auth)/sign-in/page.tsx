'use client'

import { useForm } from 'react-hook-form';

import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';

const page = () => {
    const {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues:{
            email: '',
            password: '',
        },
        mode: 'onBlur'
    }, );
    
        const onSubmit = async(data:SignInFormData)=>{
            try{
                console.log(data);
            }catch(e){
                console.error(e);
            }
        }
  return (
    <>
            <h1 className='form-title'>Log In Your Account</h1>

        
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                {/*will create a reusable component for inputs*/}
                
                <InputField
                    name="email"
                    label="Email"
                    placeholder="enter your email"
                    register= {register}
                    error={errors.email}
                    validation={{ required: 'email is required',pattern:/^\w+@\w+|.|w+$/,message:'Email address is required' }}

                />


                <InputField
                    name="password"
                    label="Password"
                    placeholder="enter strong password"
                    type="password"
                    register= {register}
                    error={errors.password}
                    validation={{ required: 'password is required', minLength:8 }}

                />

                
                <Button type="submit" disabled={isSubmitting} className='yellow-btn w-full mt-5'>
                    {isSubmitting ? 'Creating account' : 'LogIn'}
                </Button>

                <FooterLink text='Already have an account?' linkText='Sign up' href='/sign-up' />
            </form>
        </>
  )
}

export default page