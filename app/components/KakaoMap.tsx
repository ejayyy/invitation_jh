"use client";

export default function KakaoMap() {
  return (
    <section>
      <div className="text-center">
        <h3 className="mb-2">라마다서울신도림 호텔 14층 하늘정원</h3>
        <h5>서울 구로구 신도림동 427-3</h5>
      </div>
      <div className="mt-6 text-center text-lg text-gray-600">
        <ul>
          <li className="font-semibold">지하철 이용 시</li>
          <li>- 지하철 1호선, 2호선 신도림역 1번 출구 (신도림역 광장 도보10분)</li>
          <li>- 셔틀버스 타는 곳 : 신도림역 1번 출구 앞</li>
        </ul>
        <ul className="my-2">
          <li className="font-semibold">버스 이용 시</li>
          <li>- 신도림역(구로역)</li>
          <li>- 간선버스(파랑) : 160. 503. 600. 662. 670. N16(심야)</li>
          <li>- 지선버스(초록): 6513. 6515. 6516. 6637. 6640B</li>
          <li>- 경기일반 : 10.11-1.11-2.510.530. 83. 88. 88-1(새벽)</li>
          <li>- 좌석버스 : 301,32</li>
        </ul>
        <ul>
          <li className="font-semibold">자가용 이용 시</li>
          <li>- 승용차 주차장 입구 : 서울특별시 구로구 신도림동 427-3</li>
          <li>- 관광버스 주차장 입구 : 서울특별시 구로구 경인로 624</li>
          <li>- 주차 1시간 30분 무료 , 15분당 1000원</li>
        </ul>
      </div>
    </section>
  );
}

