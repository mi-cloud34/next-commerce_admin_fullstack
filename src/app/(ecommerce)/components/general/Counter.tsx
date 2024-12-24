
 interface CounterProps {
    cardProduct : ProductType,
    increaseFunc: () =>  void;
    decreaseFunc: () =>  void;
}
const Counter:React.FC<CounterProps> = ({cardProduct, increaseFunc, decreaseFunc}) => {

    const buttonStyle = "w-8 h-8 border flex items-center justify-center text-lg rounded-md"
  return (
    <div className="flex items-center gap-2">
        <div className={buttonStyle} onClick={decreaseFunc}>-</div>
        <div className="text-lg md:text-xl">{cardProduct?.inStock}</div>
        <div className={buttonStyle} onClick={increaseFunc}>+</div>
    </div>
  )
}

export default Counter