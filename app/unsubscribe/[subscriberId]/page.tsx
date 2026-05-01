import { db } from "@/db";
import { automationsTable, subscribersTable } from "@/db/schemas";
import { uuid } from "@/utils/uuid";
import { eq } from "drizzle-orm";

type UnsubscribeProps = {
   params: Promise<{
      subscriberId: string;
   }>
}

export default async function page({ params }: UnsubscribeProps) {
   try {
      const { subscriberId } = await params;
   
      const result = await db.delete(subscribersTable).where(eq(subscribersTable.subscriberId, subscriberId));
      await db.insert(automationsTable).values({ automationId: uuid(), welcomeText: `Welcome to Urbanaura Insiders🖤
   
   You’re now part of something different.
   
   Use code UA10 for 10% off your first order.
   
   Not everyone wears Urbanaura.
   One of a Kind💫🦋` });
   
      if (result.rowCount === 1) {
         return (
            <div className="box full dfb column">
               <div className="box full pd-5 pdx-2">
                  <div className="text-xl bold-700 full text-center">Unsubscribed</div>
                  <div className="text-xxs pd-05 text-center full">
                     You have unsubscribed from the Ayeik Perfumes Community.
                  </div>
               </div>
            </div>
         )
      } else {
         return <div className="box full pd-5 pdx-5"><h2>Error</h2></div>
      }
   } catch (e) {
      console.log(e);
      return <div className="box full pd-5 pdx-5"><h2>Error</h2></div>
   }

}
