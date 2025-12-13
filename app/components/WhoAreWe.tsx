import Image from "next/image";

interface WhoAreWeProps {
  className?: string;
}

export default function WhoAreWe({ className }: WhoAreWeProps) {
  return (
    <section className={className}>
      <div className="relative aspect-[5/4] w-full">
        <Image
          src="/whoweare/main.jpg"
          alt="Who are we"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1 w-fit mx-auto mt-4">
        <div className="grid grid-cols-[repeat(6,auto)] gap-2">
          <span>하후동</span><span>·</span><span>박옥분</span><span>의</span><span>아들</span><span>하정수</span>
        </div>
        <div className="grid grid-cols-[repeat(6,auto)] gap-2">
          <span>정동수</span><span>·</span><span>박미경</span><span>의</span><span>딸</span><span>정보민</span>
        </div>
      </div>
    </section>
  );
}

