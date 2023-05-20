const { PrismaClient } = require("@prisma/client");
// import { parseISO } from 'date-fns';
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
	const user1 = await prisma.users.create({
		data: {
			name: "yuhuu",
			email: "kocak@example.com",
			password: await bcrypt.hash("test123", 10),
			role: "user",
		},
	});

	const user2 = await prisma.users.create({
		data: {
			name: "heyoo",
			email: "lucu@example.com",
			password: await bcrypt.hash("test123", 10),
			role: "user",
		},
	});

	const user3 = await prisma.users.create({
		data: {
			name: "shalom",
			email: "hehe@example.com",
			password: await bcrypt.hash("test123", 10),
			role: "user",
		},
	});

	const category1 = await prisma.categories.create({
		data: {
			name: "Finance",
			description: "Funding Finance",
		},
	});

	const category2 = await prisma.categories.create({
		data: {
			name: "Arts",
			description: "Funding Art Projects",
		},
	});

	const category3 = await prisma.categories.create({
		data: {
			name: "Food & Beverages",
			description: "Funding Hot and Trending Local FnBs",
		},
	});

	const category4 = await prisma.categories.create({
		data: {
			name: "Health",
			description: "Funding Wellbeing",
		},
	});

	//Campaign Finance
	const campaign11 = await prisma.campaign.create({
		data: {
			title: "Sawi Network",
			description: "New Network on Cryptocurrency",
			goal: 1000000,
			currentDonation: 0,
			endDate: new Date("2023-08-30"),
			user: {
				connect: { id: user1.id },
			},
			categories: {
				create: [{ category_id: category1.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1593924689241-1b78c38f0071?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
					},
				],
			},
		},
	});
	const campaign12 = await prisma.campaign.create({
		data: {
			title: "Insurtechie",
			description:
				"Next generation insurance that Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis lectus id diam scelerisque, at porta urna egestas. Maecenas magna mauris, varius eleifend eros non, varius vehicula felis. Sed iaculis eros pharetra justo viverra, vitae dapibus ante dictum. Praesent tincidunt ante mattis massa aliquam aliquam. Morbi blandit lacus vestibulum lacus tincidunt efficitur. Nullam blandit in ipsum id consectetur. Mauris at mauris ac turpis sodales ultricies vel ut est. Sed ut metus in velit tincidunt congue sit amet et mi.",
			goal: 10000000,
			currentDonation: 50000,
			endDate: new Date("2023-11-25"),
			user: {
				connect: { id: user1.id },
			},
			categories: {
				create: [{ category_id: category1.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
					},
				],
			},
		},
	});
	const campaign13 = await prisma.campaign.create({
		data: {
			title: "Loan Sharkz",
			description:
				"Paylater for Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis lectus id diam scelerisque, at porta urna egestas. Maecenas magna mauris, varius eleifend eros non, varius vehicula felis. Sed iaculis eros pharetra justo viverra, vitae dapibus ante dictum. Praesent tincidunt ante mattis massa aliquam aliquam. Morbi blandit lacus vestibulum lacus tincidunt efficitur. Nullam blandit in ipsum id consectetur. Mauris at mauris ac turpis sodales ultricies vel ut est. Sed ut metus in velit tincidunt congue sit amet et mi.",
			goal: 7050000,
			currentDonation: 6750000,
			endDate: new Date("2024-05-31"),
			user: {
				connect: { id: user2.id },
			},
			categories: {
				create: [{ category_id: category1.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
					},
				],
			},
		},
	});

	//Campaign Arts
	const campaign21 = await prisma.campaign.create({
		data: {
			title: "Piloks",
			description:
				"New spray techology! Suitable for Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis lectus id diam scelerisque, at porta urna egestas. Maecenas magna mauris, varius eleifend eros non, varius vehicula felis. Sed iaculis eros pharetra justo viverra, vitae dapibus ante dictum. Praesent tincidunt ante mattis massa aliquam aliquam. Morbi blandit lacus vestibulum lacus tincidunt efficitur. Nullam blandit in ipsum id consectetur. Mauris at mauris ac turpis sodales ultricies vel ut est. Sed ut metus in velit tincidunt congue sit amet et mi.",
			goal: 500000,
			currentDonation: 100000,
			endDate: new Date("2024-05-31"),
			user: {
				connect: { id: user3.id },
			},
			categories: {
				create: [{ category_id: category2.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1616474103484-75eabb8f2590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
					},
				],
			},
		},
	});

	const campaign22 = await prisma.campaign.create({
		data: {
			title: "Line Brush",
			description:
				"Finest tip point in the world. 100% Guarantee! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis lectus id diam scelerisque, at porta urna egestas. Maecenas magna mauris, varius eleifend eros non, varius vehicula felis. Sed iaculis eros pharetra justo viverra, vitae dapibus ante dictum. Praesent tincidunt ante mattis massa aliquam aliquam. Morbi blandit lacus vestibulum lacus tincidunt efficitur. Nullam blandit in ipsum id consectetur. Mauris at mauris ac turpis sodales ultricies vel ut est. Sed ut metus in velit tincidunt congue sit amet et mi.",
			goal: 500000,
			currentDonation: 100000,
			endDate: new Date("2024-05-31"),
			user: {
				connect: { id: user3.id },
			},
			categories: {
				create: [{ category_id: category2.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1520856990214-7a9e59dd5ff7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
					},
				],
			},
		},
	});

	const campaign23 = await prisma.campaign.create({
		data: {
			title: "Paper Mache",
			description:
				"Pure recycled goodness. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis lectus id diam scelerisque, at porta urna egestas. Maecenas magna mauris, varius eleifend eros non, varius vehicula felis. Sed iaculis eros pharetra justo viverra, vitae dapibus ante dictum. Praesent tincidunt ante mattis massa aliquam aliquam. Morbi blandit lacus vestibulum lacus tincidunt efficitur. Nullam blandit in ipsum id consectetur. Mauris at mauris ac turpis sodales ultricies vel ut est. Sed ut metus in velit tincidunt congue sit amet et mi.",
			goal: 500000,
			currentDonation: 100000,
			endDate: new Date("2024-05-31"),
			user: {
				connect: { id: user3.id },
			},
			categories: {
				create: [{ category_id: category2.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1535137755190-8a0b337717e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
					},
				],
			},
		},
	});

	const campaign24 = await prisma.campaign.create({
		data: {
			title: "Slice of Life",
			description:
				"Smooth yet SHARP. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis lectus id diam scelerisque, at porta urna egestas. Maecenas magna mauris, varius eleifend eros non, varius vehicula felis. Sed iaculis eros pharetra justo viverra, vitae dapibus ante dictum. Praesent tincidunt ante mattis massa aliquam aliquam. Morbi blandit lacus vestibulum lacus tincidunt efficitur. Nullam blandit in ipsum id consectetur. Mauris at mauris ac turpis sodales ultricies vel ut est. Sed ut metus in velit tincidunt congue sit amet et mi.",
			goal: 500000,
			currentDonation: 100000,
			endDate: new Date("2024-05-31"),
			user: {
				connect: { id: user3.id },
			},
			categories: {
				create: [{ category_id: category2.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1522933457979-b1d7dcb19e7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
					},
				],
			},
		},
	});

	const campaign25 = await prisma.campaign.create({
		data: {
			title: "Multitool Express",
			description:
				"All you ever need for your next masterpiece. VERY LIMITED RUN! ORDER NOW! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis lectus id diam scelerisque, at porta urna egestas. Maecenas magna mauris, varius eleifend eros non, varius vehicula felis. Sed iaculis eros pharetra justo viverra, vitae dapibus ante dictum. Praesent tincidunt ante mattis massa aliquam aliquam. Morbi blandit lacus vestibulum lacus tincidunt efficitur. Nullam blandit in ipsum id consectetur. Mauris at mauris ac turpis sodales ultricies vel ut est. Sed ut metus in velit tincidunt congue sit amet et mi.",
			goal: 500000,
			currentDonation: 100000,
			endDate: new Date("2024-05-31"),
			user: {
				connect: { id: user1.id },
			},
			categories: {
				create: [{ category_id: category2.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
					},
				],
			},
		},
	});

	//Campaign Food & Beverages
	const campaign31 = await prisma.campaign.create({
		data: {
			title: "Starting Coffee",
			description:
				"Time to wake up, start your day in the best way possible. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis lectus id diam scelerisque, at porta urna egestas. Maecenas magna mauris, varius eleifend eros non, varius vehicula felis. Sed iaculis eros pharetra justo viverra, vitae dapibus ante dictum. Praesent tincidunt ante mattis massa aliquam aliquam. Morbi blandit lacus vestibulum lacus tincidunt efficitur. Nullam blandit in ipsum id consectetur. Mauris at mauris ac turpis sodales ultricies vel ut est. Sed ut metus in velit tincidunt congue sit amet et mi.",
			goal: 1234500,
			currentDonation: 98765,
			endDate: new Date("2024-05-31"),
			user: {
				connect: { id: user1.id },
			},
			categories: {
				create: [{ category_id: category3.id }],
			},
			banner: {
				create: [
					{
						image: "https://images.unsplash.com/photo-1544047963-0cfb7692fd4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
					},
				],
			},
		},
	});

	const donation1 = await prisma.donations.create({
		data: {
			amount: 15000,
			user: {
				connect: { id: user1.id },
			},
			campaign: {
				connect: { id: campaign11.id },
			},
		},
	});

	const comment11 = await prisma.comment.create({
		data: {
			content: "Mudah-mudahan lunas",
			user: {
				connect: { id: user1.id },
			},
			campaign: {
				connect: { id: campaign11.id },
			},
		},
	});

	const comment12 = await prisma.comment.create({
		data: {
			content: "Keren, melejit, sukses!!",
			user: {
				connect: { id: user2.id },
			},
			campaign: {
				connect: { id: campaign11.id },
			},
		},
	});

	const comment13 = await prisma.comment.create({
		data: {
			content: "Selamat/Sukses",
			user: {
				connect: { id: user3.id },
			},
			campaign: {
				connect: { id: campaign11.id },
			},
		},
	});

	const bookmark11 = await prisma.bookmark.create({
		data: {
			user: {
				connect: { id: user1.id },
			},
			campaign: {
				connect: { id: campaign11.id },
			},
		},
	});

	const bookmark12 = await prisma.bookmark.create({
		data: {
			user: {
				connect: { id: user1.id },
			},
			campaign: {
				connect: { id: campaign12.id },
			},
		},
	});

	const bookmark21 = await prisma.bookmark.create({
		data: {
			user: {
				connect: { id: user1.id },
			},
			campaign: {
				connect: { id: campaign21.id },
			},
		},
	});

	const bookmark31 = await prisma.bookmark.create({
		data: {
			user: {
				connect: { id: user1.id },
			},
			campaign: {
				connect: { id: campaign31.id },
			},
		},
	});

	console.log("Data seed successful!");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
