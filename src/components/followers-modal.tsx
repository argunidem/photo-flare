"use client";

import { usePathname, useRouter } from "next/navigation";
import useMount from "@/hooks/use-mount";
import Follower from "@/components/follower";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FollowerWithExtras } from "@/lib/definitions";

function FollowersModal({
   followers,
   username,
}: {
   followers: FollowerWithExtras[] | undefined;
   username: string;
}) {
   const mount = useMount();
   const pathname = usePathname();
   const router = useRouter();
   const isFollowersPage = pathname === `/dashboard/${username}/followers`;

   if (!mount) return null;

   return (
      <Dialog
         open={isFollowersPage}
         onOpenChange={(isOpen) => !isOpen && router.back()}
      >
         <DialogContent className='dialogContent'>
            <DialogHeader className='border-b border-zinc-300 dark:border-neutral-700 py-2 w-full'>
               <DialogTitle className='mx-auto font-bold text-base'>Followers</DialogTitle>
            </DialogHeader>

            {followers?.length === 0 && (
               <p className='py-3 text-center text-sm'>This user has no followers.</p>
            )}

            <ScrollArea className='min-h-fit max-h-[350px]'>
               {followers?.map((follower) => (
                  <Follower
                     key={follower.followerId}
                     follower={follower}
                  />
               ))}
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
}

export default FollowersModal;
