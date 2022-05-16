import { ReactComponentElement } from "react";

type IconProps = {
  ChildIcon: JSX.Element;
  onClick: () => {};
};
const Icon = ({ ChildIcon, onClick }: IconProps) => {
  return (
    <div className="h-7 w-7 cursor-pointer hover:bg-neutral-100 p-1 rounded-3xl flex justify-center items-center">
      <ChildIcon className="h-5 w-5" onClick={onClick} />
    </div>
  );
};

export default Icon;
