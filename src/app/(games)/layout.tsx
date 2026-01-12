export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen w-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
}
