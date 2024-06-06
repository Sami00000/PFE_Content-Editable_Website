<?php
namespace App\Repository;

use App\Entity\EditableHeadingContent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EditableHeadingContent>
 *
 * @method EditableHeadingContent|null find($id, $lockMode = null, $lockVersion = null)
 * @method EditableHeadingContent|null findOneBy(array $criteria, array $orderBy = null)
 * @method EditableHeadingContent[]    findAll()
 * @method EditableHeadingContent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EditableHeadingContentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EditableHeadingContent::class);
    }

    // src/Repository/EditableHeadingContentRepository.php
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
        ->select('DISTINCT e.page')
       ;

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


}
