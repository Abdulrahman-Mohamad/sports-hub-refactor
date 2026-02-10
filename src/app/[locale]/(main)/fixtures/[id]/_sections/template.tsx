import AnimateNavigation from "@/components/layout/AnimateNavigation";

type Props = {
    children: React.ReactNode;
}
export default function Template({ children }: Props) {
  return (
      <AnimateNavigation>
        {children}
      </AnimateNavigation>
  );
}
