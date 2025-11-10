/**
 * order controller
 */
const { createCoreController } = require("@strapi/strapi").factories;
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
	async create(ctx) {
		//@ts-ignore

		const { products } = ctx.request.body;
		try {
			const lineItems = await Promise.all(
				products.map(async (product) => {
					const item = await strapi.db.query("api::product.product").findOne({
						where: { documentId: product.documentId },
					});

					return {
						price_data: {
							currency: "eur",
							product_data: {
								name: item.productName,
							},
							unit_amount: Math.round(item.price * 100),
						},
						quantity: 1,
					};
				})
			);
			const session = await stripe.checkout.sessions.create({
				shipping_address_collection: { allowed_countries: ["ES"] },
				payment_method_types: ["card"],
				mode: "payment",
				success_url: `${process.env.CLIENT_URL}/success`,
				cancel_url: `${process.env.CLIENT_URL}/successError`,
				line_items: lineItems,
			});

			await strapi.service("api::order.order").create({ data: { products, stripeId: session.id } });
			return { stripeSession: session };
		} catch (error) {
			console.error("Stripe error:", error);
			ctx.response.status = 500;
			return { error: error.message };
		}
	},
}));
