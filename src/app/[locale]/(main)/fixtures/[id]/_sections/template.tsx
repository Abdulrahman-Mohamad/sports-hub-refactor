import AnimateNavigation from "@/components/ui/AnimateNavigation";

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
