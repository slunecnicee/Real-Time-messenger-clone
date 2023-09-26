'use client'
import clsx from "clsx";

interface ButtonType{
    type?:'button'|'submit'|'reset'|undefined;
    disabled?:boolean;
    children?:React.ReactNode;
    secondary?:boolean;
    danger?:boolean;
    onClick?:()=>void
    fullWidth?:boolean;

}


const Button:React.FC<ButtonType> = ({
    type,
    disabled,
    children,
    secondary,
    danger,
    onClick,
    fullWidth
}) => {
    return ( 
        <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(`
          flex 
          justify-center 
          rounded-md 
          px-3 
          py-2 
          text-sm 
          font-semibold 
          focus-visible:outline 
          focus-visible:outline-2 
          focus-visible:outline-offset-2 
          `,
          disabled && 'opacity-50 cursor-default',
          fullWidth && 'w-full',
          secondary ? 'text-gray-900' : 'text-white',
          danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
          !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
        )}
      >
        {children}
      </button>
     );
}
 
export default Button;