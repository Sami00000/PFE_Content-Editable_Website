<?php

namespace App\Repository;

use App\Entity\EditableTextContent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EditableTextContent>
 *
 * @method EditableTextContent|null find($id, $lockMode = null, $lockVersion = null)
 * @method EditableTextContent|null findOneBy(array $criteria, array $orderBy = null)
 * @method EditableTextContent[]    findAll()
 * @method EditableTextContent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EditableTextContentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EditableTextContent::class);
    }
    
    public function findBySearchAndSort(string $search, string $sort, string $direction, string $pageFilter = null): array
{
    $qb = $this->createQueryBuilder('e');

    if ($search) {
        $qb->andWhere('e.textContent LIKE :search OR e.tag LIKE :search OR e.page LIKE :search')
           ->setParameter('search', '%' . $search . '%');
    }

    if ($pageFilter) {
        $qb->andWhere('e.page = :pageFilter')
           ->setParameter('pageFilter', $pageFilter);
    }

    $qb->orderBy('e.' . $sort, $direction);

    return $qb->getQuery()->getResult();
}

public function findDistinctPages(): array
{
    $qb = $this->createQueryBuilder('e')
        ->select('DISTINCT e.page');

    return $qb->getQuery()->getResult();
}

public function findByPage(string $page): array
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.page = :page')
            ->setParameter('page', $page)
            ->getQuery()
            ->getResult();
    }
//    /**
//     * @return EditableTextContent[] Returns an array of EditableTextContent objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?EditableTextContent
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
