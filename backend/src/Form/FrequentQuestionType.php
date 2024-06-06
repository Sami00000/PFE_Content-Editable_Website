<?php

namespace App\Form;

use App\Entity\FrequentQuestion;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
class FrequentQuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('question_text' , TextType::class , [
                'attr' => [
                    'class' => 'form_question_text'
                ],
            ])
            ->add('question_respond' ,TextType::class ,  [
                'attr' => [
                    'class' => 'form_question_respond'
                ],
            ])
            ->add('frequency')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => FrequentQuestion::class,
        ]);
    }
}
