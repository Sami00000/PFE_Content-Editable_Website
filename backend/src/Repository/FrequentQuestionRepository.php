<?php

namespace App\Repository;

use App\Entity\FrequentQuestion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FrequentQuestion>
 *
 * @method FrequentQuestion|null find($id, $lockMode = null, $lockVersion = null)
 * @method FrequentQuestion|null findOneBy(array $criteria, array $orderBy = null)
 * @method FrequentQuestion[]    findAll()
 * @method FrequentQuestion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FrequentQuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FrequentQuestion::class);
    }
    public function remove(FrequentQuestion $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    public function getOrderedFAQs(): array
    {
        return $this->createQueryBuilder('f')
            ->orderBy('f.frequency', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }
    public function getTopFAQs(): array
    {
        return $this->createQueryBuilder('f')
            ->orderBy('f.frequency', 'DESC')
            ->setMaxResults(6)
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return FrequentQuestion[] Returns an array of FrequentQuestion objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?FrequentQuestion
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
