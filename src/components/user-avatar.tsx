import Image from "next/image";
import type { User } from "next-auth";
import { Avatar } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import { User as UserIcon } from "lucide-react";

type Props = Partial<AvatarProps> & {
   user: User | undefined;
};

const UserAvatar = ({ user, ...avatarProps }: Props) => {
   return (
      <Avatar
         className='relative h-8 w-8'
         {...avatarProps}
      >
         {user?.image ? (
            <Image
               src={user.image}
               fill
               alt={`${user?.name}'s profile picture`}
               className='rounded-full object-cover'
            />
         ) : (
            <UserIcon />
         )}
      </Avatar>
   );
};

export default UserAvatar;
