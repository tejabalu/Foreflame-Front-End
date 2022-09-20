import { Fragment, ReactElement } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { IoLogOutSharp } from "react-icons/io5";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile({
  Name,
  Role,
}: {
  Name: string;
  Role: string;
}) {
  function MenuItem(props: { value: string; icon: ReactElement<any, any> }) {
    return (
      <Menu.Item>
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? "bg-gray-100" : "text-gray-700",
              "block px-4 py-2 text-sm",
              "transition-all",
              "hover:bg-gray-200",
              "flex",
              "flex-row",
              "items-center",
              "justify-between"
            )}
          >
            {props.value}
            <span className="scale-150 fill-dark-green">{props.icon}</span>
          </a>
        )}
      </Menu.Item>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="">
        {/* TODO: Add classes for transitions */}
        <Menu.Button className="flex align-center items-center ml-10">
          <div className="flex flex-col font-bold text-2xl px-2">
            {Name}
            <span className="text-sm">{Role}</span>
          </div>
          <div className="bg-[#D9D9D9] h-14 flex items-center justify-center rounded-full aspect-square">
            <BsFillPersonFill className="fill-dark-green h-[55%] w-[55%]" />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-100 shadow-lg border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-1 px-1">
          <div className="py-1 ">
            {MenuItem({ value: "Account", icon: <MdManageAccounts /> })}
            {MenuItem({ value: "Preferences", icon: <AiFillSetting /> })}
            {MenuItem({ value: "Logout", icon: <IoLogOutSharp /> })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
