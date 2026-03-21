const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
        <button onClick={handleQtyDecrease}
        className="border-[1.2px]  px-3 py-1 rounded">-</button>
        <div className="text-red-600">{quantity}</div>
        <button 
        className="border-[1.2px] px-3 py-1 rounded"
        onClick={handleQtyIncrease}>+</button>
      </div>
    </div>
  );
};

export default SetQuantity;
