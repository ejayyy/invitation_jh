import Image from "next/image";

interface GreetingProps {
  className?: string;
}

export default function Greeting({ className }: GreetingProps) {
  return (
    <section className={className}>
      <div className="text-center">
        <small className="tracking-[0.2em]">THE NEW BEGINNING</small>
        <p className="mt-2">하정수<span className="mx-2">그리고</span>정보민</p>
      </div>
      <div className="my-8 mx-auto relative w-full max-w-2xl aspect-[3/4]">
        <Image
          src="/greeting/main.jpg"
          alt="Main photo"
          fill
          className="object-cover rounded-t-[600px] rounded-b-[6px]"
          priority
        />
      </div>
      <div className="text-center">
        <h5>2026.03.08 오후 3시40분</h5>
        <h5>라마다서울신도림호텔 14층 하늘정원</h5>
      </div>
    </section>
  );
}

