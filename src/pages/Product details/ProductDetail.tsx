import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  return <h2>Product Details for product ID: {id}</h2>;
}