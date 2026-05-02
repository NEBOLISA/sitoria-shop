import Image from "next/image";

const categories = [
  { name: "Men", image: "https://images.unsplash.com/photo-1622866654199-d36cf0709720?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGxvZ298ZW58MHx8MHx8fDA%3D" },
  { name: "Women", image: "https://images.unsplash.com/photo-1769636929388-99eff95d3bf1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWFuJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Unisex", image: "/unisex.png" },
  { name: "Woody", image: "/woody.png" },
  { name: "Floral", image: "/floral.png" },
  { name: "Fresh", image: "/fresh.png" },
  { name: "Oriental", image: "/orienteal.png" },
 
];

export default function CategoryRow() {
  return (
    <div className="w-full overflow-x-auto mt-8">
      <div className="flex gap-6 px-4 py-4 min-w-max">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="shrink-0 w-32 cursor-pointer group"
          >
            {/* Image */}
            <div className="relative w-32 h-32 rounded-xl overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
            </div>

            {/* Text */}
            <p className="mt-2 text-center font-medium">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}