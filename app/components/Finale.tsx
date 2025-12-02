import Image from "next/image";

export default function Finale() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/finale/main.jpg"
            alt="Finale image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

