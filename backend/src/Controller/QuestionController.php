<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Question;
use App\Entity\FrequentQuestion;
use App\Repository\QuestionRepository;
use App\Repository\FrequentQuestionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
#[Route('/question', name: 'app_question.')]
class QuestionController extends AbstractController
{
    #[Route('/all', name: 'index')]
    public function index(EntityManagerInterface $em): Response
    {
        $repo = $em->getRepository(Question::class);
        $questions = $repo->findQuestions(false);
        return $this->render('question/index.html.twig', [
            'questions' => $questions,
        ]);
    }
    #[Route('/add/respond', name: 'add_respond')]
    public function addRespond(Request $req ,EntityManagerInterface $em , MailerInterface $mailer): Response
    {
        $id = $req->request->get('id');
        $respondText = $req->request->get('respond_text');
        $repo = $em->getRepository(Question::class);
        $question = $repo->find($id);
        $question->setRespond($respondText);
        $question->setIsAnswered(true);
        $em->flush();

        $email = (new Email())
            ->from('firas54677366@gmail.com')
            ->to($question->getSenderEmail())
            ->subject('Your Question Has Been Answered')
            ->text('Hello, your question has been answered. Here is the response: ' . $respondText);

        $mailer->send($email);

        return $this->redirect($this->generateUrl('app_question.index'));
    }
    #[Route('/delete/{id}', name: 'delete')]
    public function delete(EntityManagerInterface $em , Question $question): Response
    {
        $questionRepo = $em->getRepository(Question::class);
        $questionRepo->remove($question , true);
        return $this->redirect($this->generateUrl('app_question.index'));
    }
    #[Route('/add/frequent/{id}', name: 'add_frequent')]
    public function addFrequent(EntityManagerInterface $em , Question $question): Response
    {
        $questionRepo = $em->getRepository(Question::class);
        $questionsCount = $questionRepo->count([]);
        $frequentQuestionRepo = $em->getRepository(FrequentQuestion::class);
        $frequentQuestion = new FrequentQuestion();
        $frequentQuestion->setQuestionText($question->getQuestionText());
        $frequentQuestion->setQuestionRespond($question->getRespond());
        $frequentQuestion->setFrequency($questionsCount);
        $em->persist($frequentQuestion);
        $em->flush();
        return $this->redirect($this->generateUrl('app_question.index'));
    }
}
