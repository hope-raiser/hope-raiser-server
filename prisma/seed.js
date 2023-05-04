import { PrismaClient } from '@prisma/client'
import { parseISO } from 'date-fns';

const prisma = new PrismaClient()

async function main() {
  const campaign1 = await prisma.campaign.create({
    data: {
      title: 'bantuan gempa',
      description: 'menolong teman-teman yang kena gempa di aceh',
      goal: 10000000,
      currentDonation: 100000,
      endDate: parseISO('2023-09-30 01:10:04.642'),
      userId: 64,
    }
  })
  console.log(campaign1)
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