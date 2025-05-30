import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useProductStore } from '../store/product'

function UpdatingProductModal({ productToUpdate, onClose }) {
  const { updateProduct } = useProductStore()
  const [updatingProduct, setUpdatingProduct] = useState(productToUpdate)

  const [isImageLoadingError, setIsImageLoadingError] = useState(false)

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={updatingProduct.name}
              onChange={(e) =>
                setUpdatingProduct({
                  ...updatingProduct,
                  name: e.target.value,
                })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={updatingProduct.price}
              onChange={(e) =>
                setUpdatingProduct({
                  ...updatingProduct,
                  price: e.target.value,
                })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              type="url"
              value={updatingProduct.image}
              onChange={(e) => {
                setUpdatingProduct({
                  ...updatingProduct,
                  image: e.target.value,
                })
                setIsImageLoadingError(false)
              }}
            />
            {isImageLoadingError && (
              <Text variant="error">Error loading image</Text>
            )}
            <Image
              visibility={isImageLoadingError ? 'hidden' : 'visible'}
              src={updatingProduct.image}
              alt="image for this product"
              h="48"
              w="full"
              objectFit="cover"
              rounded="lg"
              onError={() => setIsImageLoadingError(true)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            colorScheme="blue"
            onClick={() => {
              updateProduct(updatingProduct)
              onClose()
            }}
          >
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdatingProductModal
