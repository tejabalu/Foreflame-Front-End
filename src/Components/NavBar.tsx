import logo from "../foreflame_logo.svg";
import Profile from "./Profile";

function Button(props: { value: string }) {
  return (
    <button className="inline-block  bg-[#DCE1DD] hover:border-gray-700 hover:bg-gray-300 p-[7px] hover:transition-all rounded-[8px] px-6 font-bold text-md mx-2">
      {props.value}
    </button>
  );
}

export function NavBar() {
  return (
    <div>
      <div className="flex items-end justify-between flex-wrap p-3 pt-4">
        <img className="h-12 mx-2 " alt="Foreflame logo" src={logo} />
        <div className="flex items-center align-bottom">
          <div>
            <Button value="Documentation" />
            <Button value="About" />
          </div>
          <Profile Name="John Doe" Role="Fire Analyst" />
        </div>
      </div>
      <div className="flex-grow border-t border-gray-500 " />
    </div>
  );
}
