const { PrismaClient } = require('@prisma/client');
// import { parseISO } from 'date-fns';
const bcrypt = require("bcrypt");
const prisma = new PrismaClient()

async function main() {
const user1 = await prisma.users.create({
    
    data: {
      name: 'Ali Doe',
      email: 'AlieDoe@example.com',
      password: await bcrypt.hash('test123', 10),
      role: 'user'
    }
  })

  const category1 = await prisma.categories.create({
    data: {
      name: 'Finance',
      description: 'Funding Finance'
    }
  })

  const campaign1 = await prisma.campaign.create({
    data: {
      title: 'Sawi Network',
      description: 'New Network on Cryptocurrency',
      goal: 1000000,
      currentDonation: 0,
      endDate: new Date('2023-08-30'),
      user: {
        connect: { id: user1.id }
      },
      categories: {
        create: [{ category_id: category1.id }]
      },
      banner: {
        create: [{ image: 'https://example.com/banner1.jpg' }]
      }
    }
  })

  const donation1 = await prisma.donations.create({
    data: {
      amount: 15000,
      user: {
        connect: { id: user1.id },
      },
      campaign: {
        connect: { id: campaign1.id },
      },
    },
  })

  const comment1 = await prisma.comment.create({
    data: {
      content: "Mudah-mudahan JP",
      user: {
        connect: { id: user1.id },
      },
      campaign: {
        connect: { id: campaign1.id },
      },
    },
  })

  const bookmark1 = await prisma.bookmark.create({
    data: {
      user: {
        connect: { id: user1.id },
      },
      campaign: {
        connect: { id: campaign1.id },
      },
    },
  })

  console.log('Seed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })