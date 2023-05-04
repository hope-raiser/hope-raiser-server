-- DropForeignKey
ALTER TABLE "banner" DROP CONSTRAINT "banner_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "campaign" DROP CONSTRAINT "campaign_userId_fkey";

-- DropForeignKey
ALTER TABLE "campaign_categories" DROP CONSTRAINT "campaign_categories_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "campaign_categories" DROP CONSTRAINT "campaign_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_userId_fkey";

-- AddForeignKey
ALTER TABLE "campaign" ADD CONSTRAINT "campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_categories" ADD CONSTRAINT "campaign_categories_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_categories" ADD CONSTRAINT "campaign_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner" ADD CONSTRAINT "banner_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
