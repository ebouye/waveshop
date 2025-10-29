import ProductItem from "./components/ProductItem";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div className="">

      <h3 className="text-3xl font-semibold">For you</h3>
      {/* Product lists */}
      <ProductList />
    </div>
  );
}
