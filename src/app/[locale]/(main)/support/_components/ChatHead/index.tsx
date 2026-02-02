
import React from 'react'
import {motion} from "framer-motion";
import { ChatHeadProps } from '@/utils/types&schemas/Generic/Support';
import { useRouter } from 'next/navigation';
import TruncateWithTooltip from '@/hooks/TruncateWithTooltip';
import Image from 'next/image';

const itemVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.2 }
  }
}

type props = {
  data:ChatHeadProps;
  closeToast:any;
}


export default function ChatHeadHeader({data,closeToast}:props) {  
  const router = useRouter();
  
  const handleClick = ()=>{
    router.push(`/support`)
  }
  return (
    <motion.button 
      onClick={handleClick}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className='w-full hover:cursor-pointer hover:bg-black/20 px-2 py-2 rounded-lg flex items-center gap-3'
    >
        {/* Image */}
        <div className='w-14 h-14 border border-primaryA1 rounded-full aspect-square flex items-center justify-center'>
            <Image width={100} height={100} alt='User' className='w-12 h-auto rounded-full object-cover' src={data?.user?.image_path || "/user.svg"}/>
        </div>
        <div className='flex flex-col gap-1 px-1'>
            <span className='font-semibold text-lg text-start'>{data?.user?.username}</span>
            <div className='text-sm  flex items-center gap-1'>
                <span className='text-black'>{TruncateWithTooltip({text:data.message,maxLength:15})}</span>
            </div>
        </div>
    </motion.button>
  )
}
