<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\FrequentQuestion;
use App\Repository\FrequentQuestionRepository;
use Symfony\Component\HttpFoundation\Request;
use App\Form\FrequentQuestionType;
#[Route('/frequentQuestion', name: 'app_frequent_question.')]
class FrequentQuestionController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(EntityManagerInterface $em): Response
    {
        $repo = $em->getRepository(FrequentQuestion::class);
        //$frequentQuestions = $repo->findALl();
        $frequentQuestions = $repo->getOrderedFAQs();
        return $this->render('frequent_question/index.html.twig', [
            'controller_name' => 'FrequentQuestionController',
            'frequentQuestions' => $frequentQuestions
        ]);
    }

    #[Route('/create', name: 'create')]
    public function create(EntityManagerInterface $em , Request $req): Response
    {
        $frequentQuestion = new FrequentQuestion();
        $form = $this->createForm(FrequentQuestionType::class , $frequentQuestion);
        $form->handleRequest($req);
        if($form->isSubmitted() && $form->isValid()){
            $frequentQuestion->setQuestionText($form->get('question_text')->getData());
            $frequentQuestion->setQuestionRespond($form->get('question_respond')->getData());
            $frequentQuestion->setFrequency($form->get('frequency')->getData());
            $em->persist($frequentQuestion);
            $em->flush();
            return $this->redirect($this->generateUrl('app_frequent_question.index'));
        }
        return $this->render('frequent_question/update.html.twig' , [
            'form' => $form,
        ]);
    }
    #[Route('/delete/{id}', name: 'delete')]
    public function delete(EntityManagerInterface $em , FrequentQuestion $frequentQuestion): Response
    {
        $repo = $em->getRepository(FrequentQuestion::class);
        $repo->remove($frequentQuestion , true);
        return $this->redirect($this->generateUrl('app_frequent_question.index'));
    }
    #[Route('/update/{id}', name: 'update')]
    public function update(EntityManagerInterface $em , int $id , Request $req , FrequentQuestionRepository $repo): Response
    {
        $frequentQuestion = $repo->find($id);
        $form = $this->createForm(FrequentQuestionType::class , $frequentQuestion);
        $form->handleRequest($req);
        if($form->isSubmitted() && $form->isValid()){
            $frequentQuestion->setQuestionText($form->get('question_text')->getData());
            $frequentQuestion->setQuestionRespond($form->get('question_respond')->getData());
            $frequentQuestion->setFrequency($form->get('frequency')->getData());
            $em->flush();
            return $this->redirect($this->generateUrl('app_frequent_question.index'));
        }
        return $this->render('frequent_question/update.html.twig' , [
            'form' => $form,
        ]);
    }
}
