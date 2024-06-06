<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $question_text = null;

    #[ORM\Column(length: 255)]
    private ?string $sender_email = null;

    #[ORM\Column(length: 255)]
    private ?string $sender_firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $sender_lastname = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    private ?bool $isAnswered = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $respond = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestionText(): ?string
    {
        return $this->question_text;
    }

    public function setQuestionText(string $question_text): static
    {
        $this->question_text = $question_text;

        return $this;
    }

    public function getSenderEmail(): ?string
    {
        return $this->sender_email;
    }

    public function setSenderEmail(string $sender_email): static
    {
        $this->sender_email = $sender_email;

        return $this;
    }

    public function getSenderFirstname(): ?string
    {
        return $this->sender_firstname;
    }

    public function setSenderFirstname(string $sender_firstname): static
    {
        $this->sender_firstname = $sender_firstname;

        return $this;
    }

    public function getSenderLastname(): ?string
    {
        return $this->sender_lastname;
    }

    public function setSenderLastname(string $sender_lastname): static
    {
        $this->sender_lastname = $sender_lastname;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function isIsAnswered(): ?bool
    {
        return $this->isAnswered;
    }

    public function setIsAnswered(bool $isAnswered): static
    {
        $this->isAnswered = $isAnswered;

        return $this;
    }

    public function getRespond(): ?string
    {
        return $this->respond;
    }

    public function setRespond(?string $respond): static
    {
        $this->respond = $respond;

        return $this;
    }
}
