import { followUser } from "@/lib/actions";
import { cn } from "@/lib/utils";
import SubmitButton from "./submit-button";
import { buttonVariants } from "./ui/button";

function FollowButton({
   profileId,
   isFollowing,
   className,
   buttonClassName,
}: {
   profileId: string;
   isFollowing?: boolean;
   className?: string;
   buttonClassName?: string;
}) {
   return (
      <form
         action={followUser}
         className={className}
      >
         <input
            type='hidden'
            value={profileId}
            name='id'
         />
         <SubmitButton
            className={buttonVariants({
               variant: isFollowing ? "secondary" : "default",
               className: cn("!font-bold w-full", buttonClassName),
               size: "sm",
            })}
         >
            {isFollowing ? "Unfollow" : "Follow"}
         </SubmitButton>
      </form>
   );
}

export default FollowButton;
