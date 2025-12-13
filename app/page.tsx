import Greeting from "./components/Greeting";
import Quote from "./components/Quote";
import WhoAreWe from "./components/WhoAreWe";
import CollageGallery from "./components/CollageGallery";
import Calendar from "./components/Calendar";
import Countdown from "./components/Countdown";
import KakaoMap from "./components/KakaoMap";
import Instagram from "./components/Instagram";
import Accordion from "./components/Accordion";
import Finale from "./components/Finale";
import Share from "./components/Share";

export default function Home() {
  return (
    <div className="w-full max-w-3xl mx-auto px-7">
      <Greeting className="my-24"/>
      <Quote className="mb-24"/>
      <WhoAreWe className="mb-34"/>
      <CollageGallery className="mb-24"/>
      <Calendar/>
      <Countdown className="mb-24"/>
      <KakaoMap className="mb-24"/>
      <Instagram className="mb-24" />
      <Accordion className="mb-24" />
      <Finale className="mb-24" />
      <Share className="mb-24" />
    </div>
  );
}
