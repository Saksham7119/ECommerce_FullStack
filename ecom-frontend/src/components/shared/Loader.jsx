import { RotatingLines } from "react-loader-spinner";

const Loader = ({text}) => {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <div className="flex flex-col justify-center items-center">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p className="text-slate-800">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
