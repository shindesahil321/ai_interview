"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormField from "@/components/FormField"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth"
import { signIn, signUP } from "@/lib/actions/auth.action"
import { auth } from "@/firebase/client"

type FormType = 'sign-in' | 'sign-up'

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter() 
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        const {name, email, password} = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);


         const result = await signUP({
          uid: userCredentials.user.uid,
          name:name!,
          email,
          password,
         })


         if(!result?.success){
          toast.error(result?.message);
          return;
         }

        toast.success('Account created sucessfulyy. Please sign in')
        router.push('/sign-in')

      } else { 
          const{ email,password} = values;

          const userCredentials = await signInWithEmailAndPassword(auth,email, password);

          const idToken = await userCredentials.user.getIdToken();

          if(!idToken){
            toast.error('Sign in failed')
            return;
          }

          await signIn({
            email,idToken
          })

        toast.success('sign in sucessfulyy.')
        router.push('/')
        console.log('SIGN IN ', values);
      }
    } catch (error: any) {
      console.log(error)
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already in use. Please sign in instead.')
      } else {
        toast.error(`There was an error: ${error.message || error}`)
      }
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="w-full max-w-md mx-auto card-board lg:min-w-[566px]">
      <div className="flex flex-col gap card py-14 px-10">
        <div className="flex-row gap-2 justify-center">
          <Image src="/prepwise_public/public/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">prepWise</h2>
        </div>
        <h3>practice job interview with AI</h3>

        <div className="dark-gradient rounded-2xl p-8 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-4 form">
              {!isSignIn && (
                <FormField control={form.control} name="name" label="Name" placeholder="Your Name" />
              )}

              <FormField control={form.control} name="email" label="Email" placeholder="Enter your email" type="email" />
              <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password" />

              <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
            </form>
          </Form>

          <p className="text-center">
            {isSignIn ? "No account yet" : 'Have an account already?'}
            <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
