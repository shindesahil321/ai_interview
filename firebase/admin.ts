 import{ cert, getApps, initializeApp} from 'firebase-admin/app';
 import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';    

const initFirebaseAdmin = () =>{
    console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
    console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
    console.log('FIREBASE_PRIVATE_KEY exists:', !!process.env.FIREBASE_PRIVATE_KEY);

    const apps= getApps();

    if(!apps.length){
        initializeApp({
            credential:cert({
                projectId:process.env.FIREBASE_PROJECT_ID,
                clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
            })
        })
    }

    return{
        auth: getAuth(),
        db:getFirestore()
    }
}
export const {auth,db}= initFirebaseAdmin();