import { Heart } from "lucide-react";
import Image from "next/image";

const ProductItem = () => {
    return (
        <div className="w-[300px]">
            {/* Add product in fav button */}
            <div className="relative w-[300px]">
                <div className="absolute z-100 right-2">
                    <button className="bg-white rounded-full p-2">
                        <Heart />
                    </button>
                </div>
                <Image
                    src={"https://i5.walmartimages.com/seo/Apple-AirPods-with-Charging-Case-2nd-Generation_8540ab4f-8062-48d0-9133-323a99ed921d.fb43fa09a0faef3f9495feece1397f8d.jpeg"}
                    alt="Test image"
                    width={300}
                    height={300} />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between font-semibold">
                    <h3 className="text-xl">Air Pods</h3>
                    <p>52000F</p>
                </div>
                <p className="text-stone-500 text-sm">AirPod pro simple description</p>
                <div>
                    <button className="px-4 py-2 border-2 rounded-full font-semibold hover:bg-green-900 hover:text-white hover:border-2">
                        Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;