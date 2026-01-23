import { useTranslations } from "next-intl";
import { CiCalendarDate, CiDollar, CiStar } from "react-icons/ci";
import { GiClown } from "react-icons/gi";
import { IoDocumentOutline, IoTimeOutline } from "react-icons/io5";

export default function HistoryTriviaTable({ data }: { data: any[] }) {
    const t = useTranslations("pages.main.history.tables");

  return <>
  <div className='!px-0 !pb-0  overflow-hidden flex flex-col gap-4 min-h-52 -mx-4'>
                <div className='max-h-[100vh] overflow-y-auto overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-[#FFA4EB]'>
                                <th className='text-center p-4'>
                                    <div className='flex items-center justify-center gap-1 '>
                                        <span><CiCalendarDate size={24}/></span>
                                        <span>{t('date')}</span>
                                    </div>                                    
                                </th>
                                <th className='text-center p-4'>
                                    <div className='flex items-center justify-center gap-1 '>
                                        <span><CiStar size={24}/></span>
                                        <span>{t('points')}</span>
                                    </div>                                    
                                </th>
                                <th className='text-center p-4'>
                                    <div className='flex items-center justify-center gap-1 '>
                                        <span><CiDollar size={24}/></span>
                                        <span>{t('coins_spent')}</span>
                                    </div>                                    
                                </th>
                                <th className='text-center p-4'>
                                    <div className='flex items-center justify-center gap-1 '>
                                        <span><IoDocumentOutline size={24}/></span>
                                        <span>{t('outcomes')}</span>
                                    </div>                                    
                                </th>
                                <th className='text-center p-4'>
                                    <div className='flex items-center justify-center gap-1 '>
                                        <span><GiClown size={24}/></span>
                                        <span>{t('use_joker')}</span>
                                    </div>                                    
                                </th>
                                <th className='text-center p-4'>
                                    <div className='flex items-center justify-center gap-1 '>
                                        <span><IoTimeOutline size={24}/></span>
                                        <span>{t('time')}</span>
                                    </div>                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((col,index)=>(
                                <tr key={index} className='border-b border-white text-white last:border-0 font-medium text-center'>
                                    <td className='p-4'>{col.date}</td>
                                    <td className='p-4 '>+{col?.points}</td>
                                    <td className='p-4 '>-{col?.coins_spent}</td>
                                    <td className='p-4 '>{col?.out_comes}</td>
                                    <td className='p-4 '>{col?.use_joker_str}</td>
                                    <td className='p-4 '>{col?.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
  </>;
}
