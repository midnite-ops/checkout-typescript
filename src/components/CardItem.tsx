interface CardItemProps {
    title: string;
    price: number;
    image: string;
    rating: {count: number, rate: number};
}
function CardItem(props: CardItemProps) {
  return (
    <div className="card-item py-10 px-5 border-r border-gray-300  flex flex-col gap-4 items-center">
      <h2>{props.title}</h2>
      <div>
        <img src={props.image} alt="" />
        <p>{props.rating.count}</p>
      </div>
      <p>{props.price}</p>
      <select name="" id="">
        <option value="1">1</option>
      </select>
      <button>Add to Cart</button>
    </div>
  )
}

export default CardItem