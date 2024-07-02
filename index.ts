import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Create a new User
	await prisma.user.create({
		data: {
			name: "Alice",
			email: "alice@example.com",
			posts: { create: { title: "Hello World" } },
			profile: { create: { bio: "I love prisma" } }
		}
	});

	// Read all Users and print them to the console
	const allUsers = await prisma.user.findMany({ include: { posts: true, profile: true } });
	console.dir(allUsers);
}

main().then(async () => {
	await prisma.$disconnect();
}).catch(async (e) => {
	console.error(e);
	await prisma.$disconnect();
	process.exit(1);
})