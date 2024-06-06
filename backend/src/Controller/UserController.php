<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index( EntityManagerInterface $em): Response
    {
        $userRepo = $em->getRepository(User::class);
        $users = $userRepo->findAll();
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
            'users' => $users ,
        ]);
    }
    #[Route('/user/delete/{id}', name: 'app_user_delete')]
    public function delete( EntityManagerInterface $em , User $user): Response
    {
        $userRepo = $em->getRepository(User::class);
        $userRepo->remove($user , true);
        return $this->redirect($this->generateUrl('app_user'));
    }
}
