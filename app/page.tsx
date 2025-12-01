import Greeting from "./components/Greeting";
import WhoAreWe from "./components/WhoAreWe";

export default function Home() {
  return (
    <div className="w-full max-w-3xl mx-auto px-7">
      <Greeting />
      <WhoAreWe />
    </div>
  );
}
