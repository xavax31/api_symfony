<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Thing;
use App\Entity\User;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;


class MainController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(ProductRepository $productRepository, EntityManagerInterface $em): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $product = new Product();
        $product->setName("yop");
        $em->persist($product);
        $em->flush();

        $thing = new Thing();
        $thing->setName("cool thing");
        $em->persist($thing);
        $em->flush();

        $result = $productRepository->findAll();
        
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/MainController.php',
            'result' => $result[0]->getName(),
            'user' => $user ? $user->getUserIdentifier() : null
        ]);
    }
}
