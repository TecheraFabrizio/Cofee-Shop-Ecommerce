"use client";

import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";

export const dataCarouselTop = [
	{
		id: 1,
		title: "Envio en 24/48 h",
		description: "Como cliente VIP, tus envios en 24/48 hs. Obten mas info y unete",
		link: "#!",
	},
	{
		id: 2,
		title: "Consigue un 25% de descuento en compras mayores a 60 dolares",
		description: "-20% al gastar 100 dolares o -25% al gastar 150 dolares. Usa el codigo de descuento TEST",
		link: "#",
	},
	{
		id: 3,
		title: "Devoluciones y entregas gratuitas",
		description: "Como cliente, tienes envios y devoluciones gratis.",
		link: "#",
	},
	{
		id: 4,
		title: "Comprar novedades",
		description: "Todas las novedades al 50% de descuento",
		link: "#",
	},
];

const CarouselTextBanner = () => {
	const router = useRouter();

	return (
		<div className="bg-secondary dark:bg-card">
			<Carousel
				className="w-full max-w-4xl mx-auto"
				plugins={[
					Autoplay({
						delay: 2500,
					}),
				]}
			>
				<CarouselContent>
					{dataCarouselTop.map(({ id, title, link, description }) => (
						<CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
							<div>
								<Card className="shadow-none border-none bg-transparent">
									<CardContent className="flex flex-col justify-center p-2 items-center text-center">
										<p className="sm:text-lg text-wrap dark:text-card-foreground">{title}</p>
										<p className="text-xs sm:text-sm text-wrap dark:text-card-foreground">{description}</p>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default CarouselTextBanner;
