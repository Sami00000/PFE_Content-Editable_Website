<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Cookie;

class LoginController extends AbstractController
{
    #[Route('/', name: 'app_login')]
    public function index(AuthenticationUtils $authenticationUtils): Response
    {
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        $response = $this->render('login/index.html.twig', [
            'controller_name' => 'LoginController',
            'error' => $error,
            'last_username' => $lastUsername,
        ]);

        if (!$error) {
            $cookie = new Cookie(
                'simple_cookie', // Cookie name
                'cookie_value',  // Cookie value
                strtotime('tomorrow'), // Expiration time
                '/', // Path
                null, // Domain (null for current domain)
                false, // Secure (false for HTTP, true for HTTPS)
                false, // HttpOnly (false to allow client-side access)
                false, // Raw
                'lax' // SameSite policy
            );

            $response->headers->setCookie($cookie);
        }

        return $response;
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }
}
