'use server';

import { headers } from 'next/headers';

import { auth } from '../better-auth/auth';
import { inngest } from '../inngest/client';

export const signUpWithEmail = async({fullName, email, password, country, investmentGoals, riskTolerance, preferredIndustry}: SignUpFormData)=>{
    try{
        const response = await auth.api.signUpEmail({
            body: { email, password, name: fullName }
        })

        if(response){
            await inngest.send({
                name: 'app/user.created',
                data:{
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry,
                }
            })
        }

        return { success: true, data: response }
    }catch(err){
        console.log('sign up failed', err);
        return { success:false, error: 'signup failed' }
    }
}


export const signInWithEmail = async({email, password,}: SignInFormData)=>{
    try{
        const response = await auth.api.signInEmail({
            body: { email, password, }
        })
        
        return { success: true, data: response }
    }catch(err){
        console.log('sign In failed', err);
        return { success:false, error: 'sign in failed' }
    }
}

export const signOut = async()=>{
    try{
        await auth.api.signOut({ headers: await headers() });
    }catch(err){
        console.log('signout failed', err)
        return { success: false, error: 'signOut failed' }
    }
}