// import ProductList from "@/components/ProductList";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
console.log({category})
  // fetch or filter products
  //const products = await getProductsByCategory(category);

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">
        {category} Perfumes
      </h1>

      {/* <ProductList products={products} /> */}
    </div>
  );
}