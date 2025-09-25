 'use server';

import { auth, db } from "@/firebase/admin";
import { CollectionReference, DocumentData, DocumentReference } from "firebase-admin/firestore";
import { cookies } from "next/headers";

const ONE_week =60 *60 * 24 * 7 ;
export async function signUP(params: SignUpParams) {
    const {uid, name, email} = params;

    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return{
                success:false,
                message:"User already exists. please sign in instead"
            }
        }
        await db.collection('users').doc(uid).set({
            name,email
        })

        return{
            success:true,
            message:"Account created successfully, Please sign in"
        }
    }catch(e:any){
        console.error('Error creating a user', e);

        if(e.code === 'auth/email-already-exists'){
            return{
                success:false,
                message:"this email is already in use"
            }
        }

        return{
            success:false,
            message:"Failed to create account"
        }
    }
}

export async function signIn(params: SignInParams){
    const {email,idToken} = params;

    try{
         const userRecord =await auth.getUserByEmail(email);

         if(!userRecord){
            return{
                success:false,
                message:"user does not exist, Create an account instead."
            }
         }

         await setSessionCookie(idToken);
    }catch (e){
        console.log(e);

        return{
            success:false,
            message:'Failed to log into an account.'
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: ONE_week * 1000,
    })

    cookieStore.set('session', sessionCookie,{
        maxAge:ONE_week,
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        path:'/',
        sameSite:'lax'
    })
}

export async function getCurrentUser(): Promise<User | null>{
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie) return null;

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.
        collection('users')//CollectionReference<DocumentData, DocumentData>
        .doc(decodedClaims.uid)//DocumentReference<DocumentData, DocumentData>
        .get();

        if(!userRecord.exists) return null;

        return{
            ...userRecord.data(),
            id:userRecord.id,
        }as User;
    }catch(e){
        console.log(e)

        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();

    return !!user;  
}
