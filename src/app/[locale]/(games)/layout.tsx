import type { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen w-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
}
