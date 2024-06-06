<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Question;
use App\Entity\FrequentQuestion;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
class ApiController extends AbstractController
{
    #[Route('/api/question/add', name: 'api_question_add', methods: ['POST'])]
    public function addQuestion(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        $questionText = $data['question'] ?? null;
        $senderEmail = $data['senderemail'] ?? null;
        $senderFirstname = $data['senderfirstname'] ?? null;
        $senderLastname = $data['senderlastname'] ?? null;

        if (empty($questionText) || empty($senderEmail) || empty($senderFirstname) || empty($senderLastname)) {
            return new Response('Missing required parameters', Response::HTTP_BAD_REQUEST);
        }

        $question = new Question();
        $question->setQuestionText($questionText);
        $question->setSenderEmail($senderEmail);
        $question->setSenderFirstname($senderFirstname);
        $question->setSenderLastname($senderLastname);
        $question->setDate(new \DateTime());
        $question->setIsAnswered(false);

        $em->persist($question);
        $em->flush();
        return new Response('Question was created', Response::HTTP_CREATED);
    }
    #[Route('/api/faqs/top', name: 'api_faqs_top', methods: ['GET'])]
    public function getTopFaqs(Request $request, EntityManagerInterface $em , SerializerInterface $serializer): JsonResponse
    {
        $repo = $em->getRepository(FrequentQuestion::class);
        $frequentQuestions = $repo->getTopFAQs();
        //dump($frequentQuestions);
        //return new JsonResponse($frequentQuestions);
        //return $this->json($serializer->serialize($frequentQuestions, 'json'));
        return $this->json($frequentQuestions , Response::HTTP_OK , [] , [
            ObjectNormalizer::IGNORED_ATTRIBUTES => ['id'],
            ObjectNormalizer::IGNORED_ATTRIBUTES => ['frequency'],
        ]);
    }
}
