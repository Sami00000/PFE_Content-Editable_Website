<?php

namespace App\Entity;

use App\Repository\FrequentQuestionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FrequentQuestionRepository::class)]
class FrequentQuestion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $question_text = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $question_respond = null;

    #[ORM\Column]
    private ?int $frequency = null;

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

    public function getQuestionRespond(): ?string
    {
        return $this->question_respond;
    }

    public function setQuestionRespond(?string $question_respond): static
    {
        $this->question_respond = $question_respond;

        return $this;
    }

    public function getFrequency(): ?int
    {
        return $this->frequency;
    }

    public function setFrequency(int $frequency): static
    {
        $this->frequency = $frequency;

        return $this;
    }
}
