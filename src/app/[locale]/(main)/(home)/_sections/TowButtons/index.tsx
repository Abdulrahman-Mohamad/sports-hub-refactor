import { useTranslations } from "next-intl";
import Image from "next/image";
import * as motion from "motion/react-client"
import Link from "next/link";

export default function TowButtonsSection() {
  const t = useTranslations("pages.main.home.tow_buttons");
  return (
    <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10 text-white px-4 lg:px-8">
      {/* Games */}
      <div className=" py-8 w-full max-w-[440px] bg-white/35 rounded-xl flex flex-col justify-between items-center gap-10">
      <h2 className="!text-4xl text-shadow-white">{t("games")}</h2>
      <Image src='/gif/home/ball.gif' alt="ball" width={1000} height={1000} className="max-w-[216px] w-44"/>
      <Link href={'/games'}>
      <motion.button 
      whileHover={{scale:1.1}}
      whileTap={{scale:0.9}}
      className="bg-gradient-primary rounded-full px-14 py-2 text-xl font-semibold cursor-pointer">
        {t("play_now")}
        </motion.button>
        </Link>
      </div>
      {/* packages */}
      <div className=" py-8 w-full max-w-[440px] bg-white/35 rounded-xl flex flex-col justify-between items-center gap-10">
      <h2 className="!text-4xl text-shadow-white">{t("packages")}</h2>
      <Image src='/gif/home/package-gift.gif' alt="ball" width={1000} height={1000} className="max-w-[216px] w-44"/>
      <Link href={'/packages'}>
      <motion.button 
      whileHover={{scale:1.1}}
      whileTap={{scale:0.9}}
      className="bg-gradient-primary rounded-full px-14 py-2 text-xl font-semibold cursor-pointer">
        {t("explore")}
        </motion.button>
        </Link>
      </div>
    </div>
  )
}