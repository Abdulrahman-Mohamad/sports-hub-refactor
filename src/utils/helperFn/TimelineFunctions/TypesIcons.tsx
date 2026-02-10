import {
  CardDetails,
  FixtureEvent,
  GoalDetails,
  SubstDetails,
  VarDetails,
} from "@/utils/types&schemas/Predictions/Highlights";
import Image from "next/image";
import normalGoalImg from "@/assets/predictions/goal/normal-goal.png";
import ownGoalImg from "@/assets/predictions/goal/own-goal.png";
import penaltyImg from "@/assets/predictions/goal/penalty.png";
import missedPenaltyImg from "@/assets/predictions/goal/missed-penalty.png";
import yellowCardImg from "@/assets/predictions/card/yellow-card.png";
import redCardImg from "@/assets/predictions/card/red-card.png";
import substImg from "@/assets/predictions/subst/Subst.png";
import varConfirmedImg from "@/assets/predictions/var/var-confirmed.png";

const handleGoal = (details: GoalDetails) => {
  return (
    <Image
      src={
        details === "Normal Goal"
          ? normalGoalImg
          : details === "Own Goal"
          ? ownGoalImg
          : details === "Missed Penalty"
          ? missedPenaltyImg
          : details === "Penalty"
          ? penaltyImg
          : "/default-event-img.png"
      }
      alt="Goal Image"
      width={50}
      height={50}
      className="w-[25px]  md:w-[50px] h-auto"
    />
  );
};

const handleCard = (details: CardDetails) => {
  return (
    <Image
      src={
        details === "Yellow Card"
          ? yellowCardImg
          : details === "Red Card"
          ? redCardImg
          : "/default-event-img.png"
      }
      alt="Card Image"
      width={50}
      height={50}
      className="w-[25px]  md:w-[50px] h-auto"
    />
  );
};

const handleSubst = () => {
  return (
    <Image
      src={substImg}
      alt="Substituition Image"
      width={100}
      height={100}
      className="w-[40px] h-auto"
    />
  );
};
const handleVar = (details: VarDetails) => {
  return (
    <Image
      src={
        details === "Penalty confirmed"
          ? varConfirmedImg
          : details === "Goal cancelled"
          ? missedPenaltyImg
          : "/default-event-img.png"
      }
      alt="Var Image"
      width={50}
      height={50}
      className="w-[25px]  md:w-[50px] h-auto"
    />
  );
};

export const getEventIcon = (event: FixtureEvent) => {
  switch (event.type) {
    case "Goal":
      return handleGoal(event.detail);
    case "Card":
      return handleCard(event.detail);
    case "subst":
      return handleSubst();
    case "Var":
      return handleVar(event.detail);
  }
};
