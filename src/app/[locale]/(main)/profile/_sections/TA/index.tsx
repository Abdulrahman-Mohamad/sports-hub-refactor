import React from 'react'
import {  FaHeart, FaQuestion, FaStar, FaTrophy } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdEdit, MdVerified } from 'react-icons/md';
import { RiFootballLine } from 'react-icons/ri';
import { IoIosGift } from "react-icons/io";
import { BiSolidZap } from "react-icons/bi";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { TbVs } from "react-icons/tb";
import { useTranslations } from 'next-intl';
import { LuFileText } from 'react-icons/lu';
import { activities, transaction, UnionType } from '@/utils/types/User/profile';

const IconCard = ({
    color,
    Icon
}:{
    color:string;
    Icon: React.ElementType;
})=>{    
    return(
        <div className={`rounded-full border w-8 sm:w-10 md:w-12 aspect-square  flex items-center justify-center overflow-hidden`} style={{borderColor:color}}>
            <span className={`w-6 sm:w-8 md:w-10 aspect-square bg-[${color}]/25 rounded-full flex items-center justify-center`} style={{backgroundColor:`${color}25`}}>
                <Icon className={`text-[${color}] text-[16px] sm:text-[20px] md:text-[24px]`}  color={`${color}`} style={{color:color}}/>
            </span>
        </div>
    )
}

const getIcon = (type:UnionType)=>{
    switch(type){
        case "Open Trivia Game":
            return (<IconCard color='#5200FD' Icon={FaQuestion}/>)
        case "End Trivia Game":
            return (<IconCard color='#58B44F' Icon={FaQuestion}/>)
        case "Update Profile":
            return (<IconCard color='#D607EC' Icon={MdEdit}/>)
        case "Win Prediction":
            return (<IconCard color='#FFDD00' Icon={FaTrophy}/>)
        case "Loss Prediction":
            return (<IconCard color='#ed1c24' Icon={IoClose}/>)
        case "Start Prediction":
            return (<IconCard color='#63AFFA' Icon={TbVs}/>)
        case "Edit Prediction":
            return (<IconCard color='#6D3EBD' Icon={TbVs}/>)
        case "Open Shot On Net Game":
            return (<IconCard color='#6D3EBD' Icon={RiFootballLine}/>)
        case "End Shot On Net Game":
            return (<IconCard color='#58B44F' Icon={RiFootballLine}/>)
        case "Purchase Package":
            return (<IconCard color='#FD8205' Icon={LuFileText }/>)
        case "Verify Pin Purchase":
            return (<IconCard color='#49ADF4' Icon={MdVerified}/>)
        case "gift coins":
            return (<IconCard color='#FF00A1' Icon={IoIosGift}/>)
        case "recharge coins":
            return (<IconCard color='#FFBD00' Icon={BiSolidZap}/>)
        case "welcome coins":
            return (<IconCard color='#ed1c24' Icon={FaHeart}/>)
        case "purchase coins":
            return (<IconCard color='#FF6200' Icon={HiMiniShoppingBag}/>)
        case "reward coins":
            return (<IconCard color='#00D9FF' Icon={FaStar}/>)
    }
}

export default function ProfileTASection({activities,transactions}:{activities:activities[],transactions:transaction[]}) {
  const t = useTranslations('pages.main.profile.ta');
  return (
    <>
    <div className=' grid lg:grid-cols-2 gap-8 mt-8 px-4 lg:px-20'>
            {/* Activities Table */}
            <div className='bg-white rounded-lg min-w-0 w-full'>
                <h3 className='p-4 border-[#a887a8] font-semibold'>{t('recent_activity')}</h3>
                <div className='max-h-[100vh] overflow-y-auto overflow-x-auto'>
                    <table className='w-full'>
                        <tbody>
                            {activities.map((activity,index)=>(
                                <tr key={index} className='border-b border-[#a887a8] last:border-0 font-medium'>
                                    <td className='p-4 flex-center'>{getIcon(activity.type)} </td>
                                    <td className='p-4 sm:text-lg'>{activity?.action} </td>
                                    <td className='p-4 text-xs sm:text-sm text-end text-gray-500 font-semibold'>{activity?.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Transaction Table */}
            <div className='bg-white rounded-lg min-w-0 w-full'>
                <h3 className='p-4 border-[#a887a8] font-semibold'>{t('recent_transactions')}</h3>
                <div className='max-h-[100vh] overflow-y-auto overflow-x-auto'>
                    <table className='w-full'>
                        <tbody className=''>
                            {transactions.map((tran,index)=>(
                                <tr key={index} className='border-b border-[#a887a8] last:border-0 font-medium'>
                                    <td className='py-4 ps-4.5 sm:ps-6 md:ps-13 lg:ps-4 xl:ps-6 2xl:ps-10'>{getIcon(tran.type)}</td>
                                    <td className=' sm:text-lg'>{tran?.type_trans}</td>
                                    <td className=''>
                                        <div className='text-gray-500 font-medium flex flex-col gap-1 text-xs sm:text-sm'>
                                            <span>{tran?.zee_coins} {t("zee_coins")}</span>
                                            
                                            <span>{tran?.price}</span>
                                        </div>
                                    </td>
                                    
                                    <td className='pe-4 md:p-4 text-xs sm:text-sm text-end text-gray-500 font-semibold'>{tran?.date_charge}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}
