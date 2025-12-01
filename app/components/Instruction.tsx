import Image from "next/image";

export default function Instruction() {
    return (
        <section className="flex justify-center items-center gap-8 px-32">
            <div className="relative w-full aspect-square rounded-full overflow-hidden">
                <Image
                    src="/instruction/broom.jpg"
                    alt="Broom"
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <span>❤️</span>
            </div>
            <div className="relative w-full aspect-square rounded-full overflow-hidden">
                <Image
                    src="/instruction/bride.jpg"
                    alt="Bride"
                    fill
                    className="object-cover"
                />
            </div>
        </section>
    );
}

