'use client'
import "@/styles/site.css"
import SignUpBanner from "@/public/banner-image.png"
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import { useState } from "react";
import { toast } from "sonner";
import { addSubscriber } from "../actions/subscriber";
import { useModal } from "@/components/Modal/ModalContext";
import Spacing from "@/components/Spacing/Spacing";

export function isValidUKMobile(number: string) {
   const cleaned = number.replace(/[\s-]/g, '');
   return /^(?:\+44|0)7\d{9}$/.test(cleaned);
}

function isValidEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export default function page () {
   const [email, setEmail] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [successfullySignedUp, setSuccessfullySignedUp] = useState(false);
   const { showModal } = useModal();

   async function handleSignUpSubscriber (callback: Function) {
      if (email == "") {
         toast.error("Please enter your email");
         callback();
         return;
      }
      if (!isValidEmail(email)) {
         toast.error("Please enter a valid email");
         callback();
         return;
      }
      if (phoneNumber == "") {
         toast.error("Please enter your phone number");
         callback();
         return;
      }
      if (!isValidUKMobile(phoneNumber)) {
         toast.error("Please enter a valid phone number");
         callback();
         return;
      }
      const signedUp = await addSubscriber(phoneNumber, email);
      if (signedUp.success) {
         setSuccessfullySignedUp(true);
      } else {
         showModal({ content: (<>{signedUp.error!}</>) })
      }
   }

   return (
      <div className="box full dfb column">
         {(successfullySignedUp) ? (<div className="box full pd-5 pdx-2">
            <div className="text-xl bold-700 full text-center" style={{ color: "#248311" }}>Success</div>
            <div className="text-xxs pd-05 text-center full">
               You have successfully signed up to the Ayeik Perfumes Community.
            </div>
            <div className="text-xxs pd-05 text-center full">
               We have sent you a message in yor inbox and sms. 
            </div>
         </div>) : (<>         
            <div className="box full pd-2 dfb align-center justify-center pdx-2">
               <div className="sign-up-banner">
                  <img src={SignUpBanner.src} alt="sign up banner" />
               </div>
            </div>
            <div className="box full dfb column pdx-2">
               <div className="text-xl bold-800 full text-center pd-1">Join the Ayeik Community</div>
               <div className="text-xxs pd-05 full text-center">Sign up to our SMS list to be the first to know when we drop and receive discounts.</div>
               <div className="box full pd-1 dfb align-center justify-center">
                  <input 
                     type="text" className="xxs pd-13 pdx-2 radius-20 full mw-400" placeholder="Email"
                     value={email} onChange={e => setEmail(e.target.value)}
                  />
               </div>
               <div className="box full pd-1 dfb align-center justify-center">
                  <input 
                     type="text" className="xxs pd-13 pdx-2 radius-20 full mw-400" placeholder="Phone Number"
                     value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                  />
               </div>
               <div className="box full pd-05 dfb align-center justify-center">
                  <AwaitButton 
                     className="xxs pd-12 pdx-5 radius-20 full mw-400" style={{ background: "#000" }}
                     onClick={handleSignUpSubscriber}
                  >Sign Up</AwaitButton>
               </div>
               <Spacing size={2} />
               <div className="text-xxs pd-05 full text-center">
                  By submitting your phone number, you agree to receive recurring automated marketing text messages from Ayeik Perfumes at the number provided. Consent is not a condition of purchase. Message and data rates may apply. Reply <b>STP</b> to unsubscribe or <b>HELP</b> for help.
               </div>
            </div>
         </>)}
      </div>
   )
}
