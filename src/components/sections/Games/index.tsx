import SingleGameSection from "@/components/ui/SingleGame/indes";
import { GamesProps } from "@/utils/types/Games/GanesProps";
import { useTranslations } from "next-intl";

export default function GamesSections({
  triviaData,
  predictionData,
  shootData,
}: GamesProps) {
  const t = useTranslations('components.ui.single_game');
  return (
    <section className="mt-10 lg:mt-16 space-y-10 lg:space-y-16">
      {/* trivia Section */}
      <SingleGameSection
        img="/images/games/trivia-bg.png"
        logo="/images/games/trivia-logo.png"
        title={t('trivia')}
        description={triviaData?.description}
        rules={triviaData?.rules}
        zee_coins={triviaData?.zee_coins}
        type="trivia"
      />
      {/* prediction Section */}
      <SingleGameSection
        img="/images/games/prediction-bg.png"
        logo="/images/games/prediction-logo.png"
        logo_className="!w-16 md:!w-24 lg:!w-32 xl:!w-40 2xl:!w-48"
        title={t('prediction')}
        description={predictionData?.description}
        rules={predictionData?.rules}
        zee_coins={predictionData?.zee_coins}
        type="prediction"
      />
      {/* shoot Section */}
      <SingleGameSection
        img="/images/games/shot_on_net-bg.png"
        logo="/images/games/shot_on_net-logo.png"
        logo_className="!w-38 md:!w-50 lg:!w-64 xl:!w-72 2xl:!w-80"
        title={t('shot_on_net')}
        description={shootData?.description}
        rules={shootData?.rules}
        zee_coins={shootData?.zee_coins}
        type="shot_on_net"
      />
    </section>
  );
}
