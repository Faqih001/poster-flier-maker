import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X } from 'lucide-react';

const plans = [
	{
		name: 'Basic',
		price: 'KES 50',
		priceDetail: 'per poster',
		description: 'Perfect for occasional use and one-time projects',
		features: [
			'1 Poster Design at a time',
			'High-resolution Downloads',
			'Commercial Usage License',
			'Basic Templates Access',
			'24-hour Support',
		],
		limitations: ['No AI text generation', 'Standard templates only'],
		cta: 'Get Started',
		popular: false,
		icon: '🏆',
		color: 'from-blue-600 to-cyan-600',
	},
	{
		name: 'Unlimited',
		price: 'KES 399',
		priceDetail: '/month',
		description: 'Best value for small businesses and regular marketers',
		features: [
			'Unlimited Poster Designs',
			'All Premium Templates',
			'AI Text Generator',
			'Priority Customer Support',
			'Custom Branding Options',
			'Social Media Integration',
			'Design History & Recovery',
		],
		cta: 'Choose This Plan',
		popular: true,
		icon: '⭐',
		color: 'from-purple-600 to-blue-600',
	},
	{
		name: 'Print & Delivery',
		price: 'KES 200',
		priceDetail: 'per print',
		description: 'Professional printing service add-on for physical marketing',
		features: [
			'Multiple Size Options (A4, A3, A2)',
			'Premium Paper Quality',
			'Fast Delivery Within Africa',
			'Bulk Order Discounts (10%+)',
			'Quality Assurance',
			'High-gloss or Matte Finish',
		],
		cta: 'Learn More',
		popular: false,
		icon: '🚚',
		color: 'from-green-600 to-teal-600',
	},
];

const Pricing = () => {
	return (
		<Layout>
			<div className="bg-gradient-to-b from-white to-purple-50 py-20 min-h-screen">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 mb-6 text-sm font-medium">
							💰 Affordable Pricing
						</Badge>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Simple Pricing
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Choose the plan that fits your hustle - whether you're just starting
							out or running a growing business
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{plans.map((plan, index) => (
							<Card
								key={index}
								className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
									plan.popular
										? 'border-2 border-purple-500 shadow-xl'
										: 'border border-gray-200 hover:border-purple-300'
								}`}
							>
								{plan.popular && (
									<Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 shadow-md z-10">
										Most Popular
									</Badge>
								)}
								<div
									className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${plan.color}`}
								></div>
								<CardContent className="p-8 text-center relative">
									<div className="text-3xl mb-4">{plan.icon}</div>
									<h3 className="text-2xl font-bold text-gray-900 mb-2">
										{plan.name}
									</h3>
									<div className="flex items-center justify-center mb-1">
										<span className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
											{plan.price}
										</span>
										{plan.priceDetail && (
											<span className="text-gray-600 font-medium ml-1">
												{plan.priceDetail}
											</span>
										)}
									</div>
									<p className="text-gray-700 mb-6 font-medium">
										{plan.description}
									</p>
									<div className="bg-gray-50 rounded-lg p-4 mb-6">
										<p className="font-semibold text-gray-700 mb-2 text-left">
											Includes:
										</p>
										<ul className="space-y-3 text-sm text-left">
											{plan.features.map((feature, featureIndex) => (
												<li
													key={featureIndex}
													className="flex items-center space-x-2"
												>
													<CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500" />
													<span className="text-gray-800">{feature}</span>
												</li>
											))}
										</ul>
										{plan.limitations && (
											<div className="mt-4 pt-4 border-t border-gray-200">
												<p className="font-medium text-gray-600 mb-2 text-left">
													Limitations:
												</p>
												<ul className="space-y-2 text-sm text-left">
													{plan.limitations.map((limitation, idx) => (
														<li
															key={idx}
															className="flex items-center space-x-2 text-gray-500"
														>
															<X className="w-4 h-4 flex-shrink-0" />
															<span>{limitation}</span>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
									<Button
										className={`w-full ${
											plan.popular
												? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg'
												: 'bg-gray-800 hover:bg-gray-900'
										} text-white text-lg py-6 font-medium transition-all duration-300`}
										onClick={async () => {
											// Only allow purchase for Basic or Unlimited
											if (plan.name === 'Print & Delivery') {
												window.location.href = '/order-prints';
												return;
											}
											const email = prompt(
												'Enter your email to continue with payment:'
											);
											if (!email) return;
											const res = await fetch('/api/initiate-intasend-payment', {
												method: 'POST',
												headers: { 'Content-Type': 'application/json' },
												body: JSON.stringify({
													amount: plan.name === 'Basic' ? 50 : 399,
													email,
													plan: plan.name,
												}),
											});
											const data = await res.json();
											if (data && data.url) {
												window.location.href = data.url;
											} else {
												alert(data.error || 'Failed to initiate payment.');
											}
										}}
									>
										{plan.cta}
									</Button>
									{plan.popular && (
										<p className="mt-3 text-sm text-purple-600 font-medium">
											30-day money-back guarantee
										</p>
									)}
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center mt-16 bg-gray-50 py-8 px-6 rounded-xl max-w-3xl mx-auto border border-gray-200">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							Need a custom plan for your business?
						</h3>
						<p className="text-gray-600 mb-4">
							Contact our team for enterprise solutions and custom pricing
							packages.
						</p>
						<Button className="border-2 border-purple-500 text-purple-700 hover:bg-purple-50">
							Contact Sales
						</Button>
					</div>
				</div>
			</div>
			{/* Payment Methods */}
			<div className="text-center mt-16">
				<h3 className="text-2xl font-bold mb-6">Accepted Payment Methods</h3>
				<div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
					<div className="text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
							<span className="text-3xl">📱</span>
						</div>
						<p className="font-medium">M-Pesa</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
							<span className="text-3xl">💳</span>
						</div>
						<p className="font-medium">Card</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
							<span className="text-3xl">🏦</span>
						</div>
						<p className="font-medium">PayPal</p>
					</div>
				</div>
				<p className="text-xs text-gray-400 mt-4">
					Payments powered by{' '}
					<a
						href="https://intasend.com"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-purple-600"
					>
						IntaSend
					</a>
				</p>
			</div>
		</Layout>
	);
};

export default Pricing;
