import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import * as motion from "motion/react-client";
import { PredictionStepProps } from '@/utils/types/Prediction';

export default function GameInsufficientJokerStep({
    setStep
}:{
    setStep:(step:PredictionStepProps)=>any;
}) {
    const t = useTranslations("games.steps.insufficient_joker")
    const router = useRouter();
    return (
        <div className='bg-white rounded-xl'>
            <div className='w-full px-8 md:px-20 py-6'>
                <h3 className='text-gradient-primary !font-bold text-center text-2xl md:text-3xl '>{t("title")}</h3>
            </div>
            <div className='px-6 md:px-8 lg:px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto '>
                <div>
                    <Image
                    src={'/images/common/sad-face.png'}
                    alt='Coin'
                    width={200}
                    height={200}
                    className='aspect-square w-[100px] md:w-[150px]'
                    unoptimized
                    />
                </div>
                <p className='text-center text-sm md:text-base lg:text-lg font-semibold mx-auto my-10'>
                    {t("description")}
                </p>
                <div className='grid grid-cols-2 gap-4 w-full md:w-3/4'>
                    <button className='btn bg-white hover:bg-white/70 text-primary border-gradient-primary !rounded-full' onClick={()=>setStep("game")}>{t("no")}</button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='btn bg-gradient-primary text-white !font-bold !rounded-full'
                        onClick={()=>router.push("/packages")}
                    >
                        {t("yes")}
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
