<?php 
// src/Controller/EditableHeadingContentController.php
namespace App\Controller;

use App\Entity\EditableHeadingContent;
use App\Form\EditableHeadingContentType;
use App\Repository\EditableHeadingContentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EditableHeadingContentController extends AbstractController
{
    #[Route('/api/get-heading-content', name: 'get_heading_content', methods: ['GET'])]
    public function getHeadingContent(EditableHeadingContentRepository $repository): JsonResponse
    {
        $headingContents = $repository->findAll();
        $data = [];

        foreach ($headingContents as $content) {
            $data[] = [
                'id' => $content->getId(),  // Include ID for reference
                'tag' => $content->getTag(),
                'page' => $content->getPage(),
                'textContent' => $content->getTextContent(),
                'headerLevel' => $content->getHeaderLevel(),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/api/update-heading-content', name: 'update_heading_content', methods: ['POST'])]
    public function updateHeadingContent(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Log the received data
        error_log('Received data: ' . print_r($data, true));

        if (empty($data)) {
            return new JsonResponse(['status' => 'error', 'message' => 'No data received'], 400);
        }

        $newHeadings = [];

        foreach ($data as $item) {
            $content = $entityManager->getRepository(EditableHeadingContent::class)->findOneBy([
                'tag' => $item['tag'],
                'page' => $item['page']
            ]);

            if (!$content) {
                $content = new EditableHeadingContent();
                $content->setTag($item['tag']);
                $content->setPage($item['page']);
                $newHeadings[] = $item;  // Track new headings
            }

            $content->setTextContent($item['textContent']);
            $content->setHeaderLevel($item['headerLevel']);
            $entityManager->persist($content);
        }

        $entityManager->flush();

        return new JsonResponse(['status' => 'success', 'newHeadings' => $newHeadings]);
    }










    #[Route('/heading', name: 'app_editable_heading_content_index', methods: ['GET'])]
    public function index(Request $request, EditableHeadingContentRepository $editableHeadingContentRepository): Response
    {
        $sort = $request->query->get('sort', 'id');
        $direction = $request->query->get('direction', 'asc');
        $search = $request->query->get('search', '');
        $pageFilter = $request->query->get('pageFilter', '');
    
        $editableHeadingContents = $editableHeadingContentRepository->findBySearchAndSort($search, $sort, $direction, $pageFilter);
        $distinctPages = $editableHeadingContentRepository->findDistinctPages();
    
        return $this->render('editable_heading_content/index.html.twig', [
            'editable_heading_contents' => $editableHeadingContents,
            'sort' => $sort,
            'direction' => $direction,
            'search' => $search,
            'pageFilter' => $pageFilter,
            'distinctPages' => $distinctPages,
        ]);
    }
    



    #[Route('/heading/new', name: 'app_editable_heading_content_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $editableHeadingContent = new EditableHeadingContent();
        $form = $this->createForm(EditableHeadingContentType::class, $editableHeadingContent);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($editableHeadingContent);
            $entityManager->flush();

            return $this->redirectToRoute('app_editable_heading_content_index');
        }

        return $this->render('editable_heading_content/new.html.twig', [
            'editable_heading_content' => $editableHeadingContent,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/heading/{id}', name: 'app_editable_heading_content_show', methods: ['GET'])]
    public function show(EditableHeadingContent $editableHeadingContent): Response
    {
        return $this->render('editable_heading_content/show.html.twig', [
            'editable_heading_content' => $editableHeadingContent,
        ]);
    }

    #[Route('/heading/{id}/edit', name: 'app_editable_heading_content_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, EditableHeadingContent $editableHeadingContent, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(EditableHeadingContentType::class, $editableHeadingContent);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_editable_heading_content_index');
        }

        return $this->render('editable_heading_content/edit.html.twig', [
            'editable_heading_content' => $editableHeadingContent,
            'form' => $form->createView(),
        ]);
    }
    #[Route('/heading/{id}', name: 'app_editable_heading_content_delete', methods: ['DELETE'])]
    public function delete(Request $request, EditableHeadingContent $editableHeadingContent, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$editableHeadingContent->getId(), $request->request->get('_token'))) {
            $entityManager->remove($editableHeadingContent);
            $entityManager->flush();
        }
    
        return $this->redirectToRoute('app_editable_heading_content_index');
    }
    













}
