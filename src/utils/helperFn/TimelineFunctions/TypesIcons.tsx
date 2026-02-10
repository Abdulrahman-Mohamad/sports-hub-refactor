import {
  CardDetails,
  FixtureEvent,
  GoalDetails,
  SubstDetails,
  VarDetails,
} from "@/utils/types/Fixtures/Highlights";
import Image from "next/image";

const handleGoal = (details: GoalDetails) => {
  return (
    <Image
      src={
        details === "Normal Goal"
          ? "/images/highlights/goal/normal-goal.png"
          : details === "Own Goal"
          ? "/images/highlights/goal/own-goal.png"
          : details === "Missed Penalty"
          ? "/images/highlights/goal/missed-penalty.png"
          : details === "Penalty"
          ? "/images/highlights/goal/penalty.png"
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
          ? "/images/highlights/card/yellow-card.png"
          : details === "Red Card"
          ? "/images/highlights/card/red-card.png"
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
      src={"/images/highlights/subst/Subst.png"}
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
          ? "/images/highlights/var/var-confirmed.png"
          : details === "Goal cancelled"
          ? "/images/highlights/goal/missed-penalty.png"
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
