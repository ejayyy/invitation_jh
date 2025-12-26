import Image from "next/image";

interface FinaleProps {
  className?: string;
}

export default function Finale({ className }: FinaleProps) {
  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/finale/main.jpg"
            alt="Finale image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="text-center mt-4 text-lg">
          <p>빛이 머무는 자리에서<br/>서로의 봄이 되기로 약속합니다.</p>
          <p>소중한 발걸음으로 축복해주세요</p>
        </div>
      </div>
    </section>
  );
}

