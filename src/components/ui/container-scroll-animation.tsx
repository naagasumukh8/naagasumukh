import React from "react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center relative w-full py-6 md:py-16">
      <div className="w-full text-center mb-6">
        {titleComponent}
      </div>
      <div className="w-full max-w-5xl mx-auto border-4 border-white/[0.08] p-2 md:p-6 bg-surface/50 rounded-[30px] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="h-[24rem] md:h-[32rem] w-full overflow-hidden rounded-2xl bg-[#0a0a0a] p-2 md:p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
