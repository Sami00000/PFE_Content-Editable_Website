<?php

namespace App\Form;

use App\Entity\EditableTextContent;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;

class EditableTextContentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('textContent')
            ->add('tag')
            ->add('page')
            ->add('createdAt', DateType::class, [
                'widget' => 'single_text',
            ])
            ->add('updatedAt', DateType::class, [
                'widget' => 'single_text',
            ]);
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => EditableTextContent::class,
        ]);
    }
}
