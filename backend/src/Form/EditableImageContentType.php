<?php

namespace App\Form;

use App\Entity\EditableImageContent;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;

class EditableImageContentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('srcContent')
            ->add('tag')
            ->add('page')
            ->add('createdAt', DateTimeType::class, [
                'widget' => 'single_text',
            ])
            ->add('updatedAt', DateTimeType::class, [
                'widget' => 'single_text',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => EditableImageContent::class,
        ]);
    }
}
