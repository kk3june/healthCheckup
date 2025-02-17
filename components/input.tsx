import { InputHTMLAttributes } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-8 px-3 py-6 text-2xl  placeholder:text-neutral-400 focus:outline-none ring-2 ring-neutral-200 focus:ring-4 transition focus:ring-blue-500 border-none"
        {...rest}
      />

      <span className="text-red-500 font-medium">{errors?.[0]}</span>
    </div>
  );
}

export default Input;
