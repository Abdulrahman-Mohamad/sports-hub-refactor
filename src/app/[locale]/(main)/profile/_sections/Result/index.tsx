import { ProfileUser } from "@/utils/types/User/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as motion from "motion/react-client";
export default function ProfileResultSection({ user }: { user: ProfileUser }) {
  const { win, loss, zee_coins } = user;
  const t = useTranslations("pages.main.profile.result");

  const cards = [
    { imgPath: "/images/profile/win.png", value: win, label: t("win") },
    { imgPath: t("lose_img"), value: loss, label: t("loss") },
    { imgPath: "/images/profile/zee_coin.png", value: zee_coins, label: t("zee_coins") },
  ];
  return (
    <>
      <h3 className="text-white ps-4 md:ps-16 lg:ps-20 mt-8">{t("statistics")}</h3>
      <section
        className="mt-8 grid grid-cols-1 gap-4 px-4 lg:px-20
    md:grid-cols-3
    "
      >
        {cards.map((card) => (
          <motion.div
            key={card.imgPath}
            whileHover={{ scale: 1.1 }}
            className="bg-white rounded-xl px-6 py-4 flex items-center gap-6"
          >
            <Image
              src={card.imgPath}
              alt={card.label}
              width={90}
              height={90}
              className="size-16 lg:size-20"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">{card.label}</p>
              <p className="text-lg font-bold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </>
  );
}
