<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240530235851 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE editable_heading_content CHANGE text_content text_content VARCHAR(255) DEFAULT NULL, CHANGE header_level header_level VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE editable_image_content CHANGE src_content src_content VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE editable_text_content CHANGE text_content text_content VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE editable_heading_content CHANGE text_content text_content VARCHAR(255) DEFAULT \'NULL\', CHANGE header_level header_level VARCHAR(255) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE editable_image_content CHANGE src_content src_content VARCHAR(255) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE editable_text_content CHANGE text_content text_content VARCHAR(255) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`');
    }
}
