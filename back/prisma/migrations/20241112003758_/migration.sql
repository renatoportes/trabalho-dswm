-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `subscribers` INTEGER NULL,
    `active_now` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monthly_billing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `total` INTEGER NULL,
    `companies_id` INTEGER NOT NULL,

    INDEX `fk_monthly_billing_companies1_idx`(`companies_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `email` VARCHAR(200) NULL,
    `total_billing` INTEGER NULL,
    `companies_id` INTEGER NOT NULL,

    INDEX `fk_sales_companies1_idx`(`companies_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` INTEGER NOT NULL,
    `company_name` VARCHAR(45) NULL,
    `cnpj` VARCHAR(14) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `monthly_billing` ADD CONSTRAINT `fk_monthly_billing_companies1` FOREIGN KEY (`companies_id`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `fk_sales_companies1` FOREIGN KEY (`companies_id`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
