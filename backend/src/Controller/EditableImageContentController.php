<?php

namespace App\Controller;

use App\Entity\EditableImageContent;
use App\Form\EditableImageContentType;
use App\Repository\EditableImageContentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class EditableImageContentController extends AbstractController
{
    #[Route('/api/update-image-content', name: 'update_image_content', methods: ['POST'])]
    public function updateImageContent(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        foreach ($data as $item) {
            $imageContent = $em->getRepository(EditableImageContent::class)->findOneBy([
                'tag' => $item['tag'],
                'page' => $item['page']
            ]) ?? new EditableImageContent();

            $imageContent->setTag($item['tag']);
            $imageContent->setPage($item['page']);
            $imageContent->setSrcContent($item['srcContent']);

            $em->persist($imageContent);
        }

        $em->flush();

        return new JsonResponse(['status' => 'success']);
    }

    #[Route('/api/get-image-content', name: 'get_image_content', methods: ['GET'])]
    public function getImageContent(EditableImageContentRepository $repository): JsonResponse
    {
        $imageContents = $repository->findAll();
        $data = array_map(function (EditableImageContent $content) {
            return [
                'id' => $content->getId(),
                'tag' => $content->getTag(),
                'page' => $content->getPage(),
                'srcContent' => $content->getSrcContent(),
            ];
        }, $imageContents);

        return new JsonResponse($data);
    }










    #[Route('/images', name: 'app_editable_image_content_index', methods: ['GET'])]
    public function index(Request $request, EditableImageContentRepository $editableImageContentRepository): Response
    {
        $sort = $request->query->get('sort', 'id');
        $direction = $request->query->get('direction', 'asc');
        $search = $request->query->get('search', '');
        $pageFilter = $request->query->get('pageFilter', '');
    
        $editableImageContents = $editableImageContentRepository->findBySearchAndSort($search, $sort, $direction, $pageFilter);
    
        $distinctPages = $editableImageContentRepository->findDistinctPages();
    
        return $this->render('editable_image_content/index.html.twig', [
            'editable_image_contents' => $editableImageContents,
            'sort' => $sort,
            'direction' => $direction,
            'search' => $search,
            'pageFilter' => $pageFilter,
            'distinctPages' => $distinctPages,
        ]);
    }
    

    #[Route('/images/new', name: 'app_editable_image_content_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $editableImageContent = new EditableImageContent();
        $form = $this->createForm(EditableImageContentType::class, $editableImageContent);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($editableImageContent);
            $entityManager->flush();

            return $this->redirectToRoute('app_editable_image_content_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('editable_image_content/new.html.twig', [
            'editable_image_content' => $editableImageContent,
            'form' => $form,
        ]);
    }

    #[Route('/images/{id}', name: 'app_editable_image_content_show', methods: ['GET'])]
    public function show(EditableImageContent $editableImageContent): Response
    {
        return $this->render('editable_image_content/show.html.twig', [
            'editable_image_content' => $editableImageContent,
        ]); 
    }

    #[Route('/images/{id}/edit', name: 'app_editable_image_content_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, EditableImageContent $editableImageContent, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(EditableImageContentType::class, $editableImageContent);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_editable_image_content_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('editable_image_content/edit.html.twig', [
            'editable_image_content' => $editableImageContent,
            'form' => $form,
        ]);
    }

    #[Route('/images/{id}', name: 'app_editable_image_content_delete', methods: ['DELETE'])]
    public function delete(Request $request, EditableImageContent $editableImageContent, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$editableImageContent->getId(), $request->request->get('_token'))) {
            $entityManager->remove($editableImageContent);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_editable_image_content_index', [], Response::HTTP_SEE_OTHER);
    }

}
