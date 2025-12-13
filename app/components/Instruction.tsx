interface InstructionProps {
    className?: string;
}

export default function Instruction({ className }: InstructionProps) {
    return (
        <section className={className}>
            <div className="text-center">
                <h3 className="mb-2 text-lg">라마다서울신도림 호텔 14층 하늘정원</h3>
                <h5 className="text-md">서울 구로구 신도림동 427-3</h5>
            </div>
            <div className="mt-10 text-center">
                <ul>
                    <li className="font-semibold">지하철 이용 시</li>
                    <li>- 지하철 1호선, 2호선 신도림역 1번 출구 (신도림역 광장 도보10분)</li>
                    <li>- 셔틀버스 타는 곳 : 신도림역 1번 출구 앞</li>
                </ul>
                <ul className="mt-10">
                    <li className="font-semibold">자가용 이용 시</li>
                    <li>- 승용차 주차장 입구 : 서울특별시 구로구 신도림동 427-3</li>
                    <li>- 관광버스 주차장 입구 : 서울특별시 구로구 경인로 624</li>
                    <li>- 주차 1시간 30분 무료 , 15분당 1000원</li>
                </ul>
            </div>
        </section>
    );
}

