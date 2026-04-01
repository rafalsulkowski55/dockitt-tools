import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const PLANS = {
  free: {
    name: "Free",
    maxFileSizeMB: 10,
    priceId: null,
  },
  pay_per_use: {
    name: "Pay-per-use",
    maxFileSizeMB: 50,
    priceId: process.env.STRIPE_PRICE_PAY_PER_USE!,
    price: 0.99,
  },
  premium: {
    name: "Premium",
    maxFileSizeMB: 100,
    priceIdMonthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY!,
    priceIdYearly: process.env.STRIPE_PRICE_PREMIUM_YEARLY!,
    priceMonthly: 4.99,
    priceYearly: 49.99,
  },
};