import React from "react";

type ButtonDoneProps = {
  name: string;
  onClick: () => void;
};

function ButtonDone({ name, onClick }: ButtonDoneProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className="self-center m-2 cursor-pointer active:bg-red-500 hover:bg-green-500 
          w-[10em] px-6 py-2
           text-white bg-green-600
           hover:shadow-riko"
      >
        {name}
      </button>
    </div>
  );
}

export default ButtonDone;
