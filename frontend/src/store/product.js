import { create } from 'zustand'

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (
      newProduct.name === undefined ||
      newProduct.price === undefined ||
      newProduct.image === undefined
    ) {
      return { success: false, message: 'Please fill in all fields' }
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })

    const data = await res.json()
    set((state) => ({ products: [...state.products, data.data] }))
    return { success: true, message: 'Product created successfully' }
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products')
    if (!res.ok) {
      return
    }
    const data = await res.json()
    set({ products: data.data })
  },
  deleteProduct: async (productId) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })

    const data = await res.json()

    if (!data.success) {
      return { success: false, message: data.message }
    }

    // updates ui immediately without a refetch
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }))
    return { success: true, message: data.message }
  },
  updateProduct: async (updatedProduct) => {
    const res = await fetch(`/api/products/${updatedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })

    const data = await res.json()
    if (!data.success) {
      return { success: false, message: data.message }
    }

    set((state) => ({
      products: [
        ...state.products.filter(
          (product) => product._id !== updatedProduct._id,
        ),
        updatedProduct,
      ],
    }))
    return { success: true, message: data.message }
  },
}))
