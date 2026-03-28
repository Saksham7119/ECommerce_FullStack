import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="min-h-[600px]
    00px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <MdShoppingCart size={80} className="text-slate-500 mb-4" />
        <div className="text-3xl font-bold text-slate-700">
          Your Cart Is Empty...
        </div>
        <div className="text-md text-slate-500 mt-2">
          Add some product to get started
        </div>
        <div className="mt-6">
            <Link 
            to="/"
            className="flex gap-2 items-center justify-center">
                <MdArrowBack size={24}/>
                <span className="font-medium text-blue-600 hover:text-slate-600 transition">Start Shopping!</span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
