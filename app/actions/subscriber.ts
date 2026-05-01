"use server"
import { db } from "@/db";
import { subscribersTable } from "@/db/schemas";
import { eq, or } from "drizzle-orm";
import { getCurrentUser } from "./user";
import { convertToPossiblePhones } from "@/utils/num";
import { uuid } from "@/utils/uuid";
import { sendWelcomeSMSMessage } from "./twilio";

export async function removeSubscriber (subscriberId: string) {
   try {
      const user = await getCurrentUser();
      if (!user) return false;
      
      const res = await db.delete(subscribersTable).where(eq(subscribersTable.subscriberId, subscriberId));
      return (res.rowCount === 1);
   } catch (e) {
      return false;
   }
}

export async function addSubscriber (phoneNumber: string, email: string): Promise<{ success: boolean, error: string | undefined }> {
   try {
      const exists = await db.select().from(subscribersTable)
         .where(or(
            eq(subscribersTable.phoneNumber, convertToPossiblePhones(phoneNumber)),
            eq(subscribersTable.email, email),
         )).limit(1);
      if (exists.length > 0) {
         return {
            error: "You are already signed up",
            success: false
         }
      }

      // add phone number to subscribers
      const subscriberId = uuid();
      const dateJoined = Date.now().toString();
		const res = await db.insert(subscribersTable).values({
         subscriberId, phoneNumber: convertToPossiblePhones(phoneNumber), email, dateJoined
      });

      if (res.rowCount === 1) {
         // send welcome sms message
         await sendWelcomeSMSMessage(convertToPossiblePhones(phoneNumber));
         return {
            success: true,
            error: undefined
         }
      } else {
         return {
            success: false,
            error: "Failed to sign you up."
         }
      }

   } catch (e) {
      console.log(e);
      return {
         error: "Failed to sign you up.",
         success: false
      };
   }
}