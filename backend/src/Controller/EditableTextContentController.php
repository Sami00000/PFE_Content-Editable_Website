<?php

namespace App\Controller;

use App\Entity\EditableTextContent;
use App\Form\EditableTextContentType;
use App\Repository\EditableTextContentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class EditableTextContentController extends AbstractController
{
    #[Route('/api/update-text-content', name: 'update_text_content', methods: ['POST'])]
    public function updateTextContent(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        foreach ($data as $item) {
            $textContent = $em->getRepository(EditableTextContent::class)->findOneBy([
                'tag' => $item['tag'],
                'page' => $item['page']
            ]) ?? new EditableTextContent();

            $textContent->setTag($item['tag']);
            $textContent->setPage($item['page']);
            $textContent->setTextContent($item['textContent']);

            $em->persist($textContent);
        }

        $em->flush();

        return new JsonResponse(['status' => 'success']);
    }

    #[Route('/api/get-text-content', name: 'get_text_content', methods: ['GET'])]
    public function getTextContent(EditableTextContentRepository $repository): JsonResponse
    {
        $textContents = $repository->findAll();
        $data = array_map(function (EditableTextContent $content) {
            return [
                'tag' => $content->getTag(),
                'page' => $content->getPage(),
                'textContent' => $content->getTextContent(),
            ];
        }, $textContents);

        return new JsonResponse($data);
    }

    #[Route('/', name: 'app_editable_text_content_index', methods: ['GET'])]
    public function index(Request $request, EditableTextContentRepository $editableTextContentRepository): Response
    {
        // Retrieve sorting, search, and page filter parameters
        $sort = $request->query->get('sort', 'id'); // Default sort by id
        $direction = $request->query->get('direction', 'asc'); // Default direction
        $search = $request->query->get('search', ''); // Default empty search
        $pageFilter = $request->query->get('page_filter', ''); // Default no page filter
    
        // Fetch filtered and sorted data
        $editableTextContents = $editableTextContentRepository->findBySearchAndSort($search, $sort, $direction, $pageFilter);
    
        // Fetch distinct pages for the filter dropdown
        $distinctPages = $editableTextContentRepository->findDistinctPages();
    
        return $this->render('editable_text_content/index.html.twig', [
            'editable_text_contents' => $editableTextContents,
            'sort' => $sort,
            'direction' => $direction,
            'search' => $search,
            'page_filter' => $pageFilter,
            'distinct_pages' => $distinctPages,
        ]);
    }
    

    #[Route('/new', name: 'app_editable_text_content_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $editableTextContent = new EditableTextContent();
        $form = $this->createForm(EditableTextContentType::class, $editableTextContent);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($editableTextContent);
            $entityManager->flush();

            return $this->redirectToRoute('app_editable_text_content_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('editable_text_content/new.html.twig', [
            'editable_text_content' => $editableTextContent,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_editable_text_content_show', methods: ['GET'])]
    public function show(EditableTextContent $editableTextContent): Response
    {
        return $this->render('editable_text_content/show.html.twig', [
            'editable_text_content' => $editableTextContent,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_editable_text_content_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, EditableTextContent $editableTextContent, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(EditableTextContentType::class, $editableTextContent);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_editable_text_content_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('editable_text_content/edit.html.twig', [
            'editable_text_content' => $editableTextContent,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_editable_text_content_delete', methods: ['DELETE'])]
    public function delete(Request $request, EditableTextContent $editableTextContent, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$editableTextContent->getId(), $request->request->get('_token'))) {
            $entityManager->remove($editableTextContent);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_editable_text_content_index', [], Response::HTTP_SEE_OTHER);
    }
}
