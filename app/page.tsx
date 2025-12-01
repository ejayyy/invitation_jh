import Greeting from "./components/Greeting";
import Quote from "./components/Quote";
import WhoAreWe from "./components/WhoAreWe";
import CollageGallery from "./components/CollageGallery";
import Instruction from "./components/Instruction";
import Calendar from "./components/Calendar";
import Countdown from "./components/Countdown";

export default function Home() {
  return (
    <div className="w-full max-w-3xl mx-auto px-7">
      <Greeting />
      <Quote />
      <WhoAreWe />
      <CollageGallery />
      <Instruction />
      <Calendar />
      <Countdown />
    </div>
  );
}
