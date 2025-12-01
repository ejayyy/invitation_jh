import Image from "next/image";

export default function Greeting() {
  return (
    <section>
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
      <div className="text-center leading-relaxed">
        <div>
          <p>서로의 하루를 함께 쓰기로 했습니다.</p>
          <p>당신을 만나 모든 시간이 사랑이 되었습니다.</p>
        </div>
        <div className="mt-4">
          <p>세상의 빛이 가장 고운 날, </p>
          <p>그 시작에 당신을 초대합니다 </p>
        </div>
      </div>
    </section>
  );
}

