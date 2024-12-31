import { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Input: FC<InputProps> = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-indigo-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg border border-indigo-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-black placeholder-gray-800 transition duration-200"
      />
    </div>
  );
};

export default Input;
