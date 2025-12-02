import Image from "next/image";

export default function Instagram() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              정수
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">jeongsu_bomin</div>
              <div className="text-xs text-gray-500">서울, 대한민국</div>
            </div>
          </div>
          <div className="relative aspect-square bg-gray-100">
            <Image
              src="/instagram/main.jpg"
              alt="Instagram post"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-4 py-3 space-y-2">
            <div className="flex items-center gap-4">
              <button className="text-2xl">
                🤍
              </button>
              <button className="text-2xl">
                💬
              </button>
              <button className="text-2xl">
                📤
              </button>
              <div className="flex-1"></div>
              <button className="text-2xl">
                🔖
              </button>
            </div>
            <div className="font-semibold text-sm">
              좋아요 <span className="text-gray-600">1,234개</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">jeongsu_bomin</span>{" "}
              <span className="text-gray-800">We are Getting Married 💕</span>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              댓글 123개 모두 보기
            </button>
            <div className="text-xs text-gray-400 uppercase">
              2시간 전
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

