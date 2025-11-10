"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { useParams } from "next/navigation";
import { ResponseType } from "@/types/response";
import { Separator } from "@/components/ui/separator";
import FiltersControlCategory from "./components/filters-controls-category";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState, useMemo } from "react";

export default function Page() {
	const params = useParams();
	const { categorySlug } = params;
	const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug);

	const [filterOrigin, setFilterOrigin] = useState("");
	const [filterTaste, setFilterTaste] = useState("");

	const filteredProducts = useMemo(() => {
		if (!result || loading) return [];

		// Sin filtros → mostrar todos
		if (filterOrigin === "" && filterTaste === "") return result;

		// Solo origen
		if (filterOrigin !== "" && filterTaste === "")
			return result.filter(
				(product: ProductType) => product.origin === filterOrigin
			);

		// Solo sabor
		if (filterOrigin === "" && filterTaste !== "")
			return result.filter(
				(product: ProductType) => product.taste === filterTaste
			);

		// Ambos filtros activos
		return result.filter(
			(product: ProductType) =>
				product.origin === filterOrigin && product.taste === filterTaste
		);
	}, [result, loading, filterOrigin, filterTaste]);

	return (
		<div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
			{result !== null && !loading && (
				<h1 className="text-3xl font-medium">
					Café {result[0].category.categoryName}
				</h1>
			)}

			<Separator />

			<div className="sm:flex sm:justify-between">
				<FiltersControlCategory
					setFilterOrigin={setFilterOrigin}
					setFilterTaste={setFilterTaste}
				/>

				<div className="grid gap-5 sm:grid-cols-2 mt-8 md:grid-cols-3 md:gap-10">
					{loading && <SkeletonSchema grid={3} />}

					{!loading &&
						filteredProducts.length > 0 &&
						filteredProducts.map((product: ProductType) => (
							<ProductCard key={product.id} product={product} />
						))}

					{!loading && result && filteredProducts.length === 0 && (
						<p className="text-center col-span-full text-muted-foreground">
							No hay productos con este filtro.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
