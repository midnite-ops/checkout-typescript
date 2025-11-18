import { formatCurrency } from "../utils/formatCurrency";
interface CardItemProps {
    title: string;
    price: number;
    image: string;
    id: number;
    onclick?: (id:number, quantity:number) => void
}
function CardItem(props: CardItemProps) {
  return (
    <div className="py-10 px-5 border-r border-gray-300  flex flex-col" key={props.id}>
      <img src={props.image} alt={props.title} className="w-40 h-44 object-contain mb-10 self-center"/>
      <div>
        <h2 className="mb-2 h-20">{props.title}</h2>
        <p className="font-bold">{formatCurrency(props.price)}</p>
      </div>
      <select name="" id="" className="my-5">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <button className="bg-yellow-500 rounded-full py-2.5 cursor-pointer" onClick={() => onclick(props.id)}>Add to Cart</button>
    </div>
  )
}

export default CardItem