<?php 

namespace App\Controller;

use App\Repository\EditableHeadingContentRepository;
use App\Repository\EditableImageContentRepository;
use App\Repository\EditableTextContentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EditablePageContentController extends AbstractController
{
    #[Route('/editable-page-content', name: 'editable_page_content', methods: ['GET'])]
    public function index(
        Request $request,
        EditableHeadingContentRepository $headingRepository,
        EditableImageContentRepository $imageRepository,
        EditableTextContentRepository $textRepository
    ): Response {
        $page = $request->query->get('page', '');
        $headings = $headingRepository->findByPage($page);
        $images = $imageRepository->findByPage($page);
        $texts = $textRepository->findByPage($page);
        $distinctPages = $headingRepository->findDistinctPages(); // Assuming headings cover all pages, adjust if needed.

        return $this->render('editable_page_content/index.html.twig', [
            'headings' => $headings,
            'images' => $images,
            'texts' => $texts,
            'distinctPages' => $distinctPages,
            'selectedPage' => $page,
        ]);
    }

    
}

