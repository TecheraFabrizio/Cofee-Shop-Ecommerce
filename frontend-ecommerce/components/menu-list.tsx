"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Café grano",
		href: "/category/grano",
		description: "Granos de café enteros que requieren ser molidos antes de su preparación.",
	},
	{
		title: "Café molido",
		href: "/category/molido",
		description: "Café en forma de polvo listo para ser utilizado en diferentes métodos de preparación.",
	},
	{
		title: "Café de cápsula",
		href: "/category/capsula",
		description: "Café envasado en cápsulas individuales, ofreciendo conveniencia y consitencia.",
	},
];

const MenuList = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList className="flex-wrap">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
										href="/"
									>
										<div className="mb-2 text-lg font-medium sm:mt-4">FabrizioDev</div>
										<p className="text-muted-foreground text-sm leading-tight">Sumérgete en el apasionante mundo del café con nuestra web.</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem href="/shop" title="Tienda">
								Accede a toda tu información, tus pedidos y mucho más.
							</ListItem>
							<ListItem href="/offers" title="Ofertas">
								Sección dedicada a promociones y descuentos especiales
							</ListItem>
							<ListItem href="/" title="Accesorios">
								Productos complementarios como tazas, molinillos, prensas, etc.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Cafés</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{components.map((component) => (
								<ListItem key={component.title} title={component.title} href={component.href}>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/accesorios" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>Accesorios</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden md:block">
					<NavigationMenuContent>
						<ul className="grid w-[200px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link href="#">Sobre nosotros</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href="#">Cafés</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href="#">Accessorios</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
export default MenuList;

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
