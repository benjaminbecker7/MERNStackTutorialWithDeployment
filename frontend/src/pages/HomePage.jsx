import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useProductStore } from '../store/product'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import UpdatingProductModal from '../components/UpdatingProductModal'

function HomePage() {
  const { products, fetchProducts } = useProductStore()

  const [updatingProduct, setUpdatingProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products 🚀
        </Text>

        {products.length === 0 ? (
          <Text
            fontSize="xl"
            textAlign="center"
            fontWeight="bold"
            color="gray.500"
          >
            No products found{' '}
            <Link to={'/create'}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: 'underline' }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={() => {
                  setUpdatingProduct(product)
                }}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
      {updatingProduct !== null && (
        <UpdatingProductModal
          productToUpdate={updatingProduct}
          onClose={() => setUpdatingProduct(null)}
        />
      )}
    </Container>
  )
}

export default HomePage
