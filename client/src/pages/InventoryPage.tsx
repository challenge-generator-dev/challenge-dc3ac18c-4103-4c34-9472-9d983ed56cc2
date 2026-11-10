import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ProductResponseDto, CreateProductDto, UpdateProductDto } from '../App';
import ProductForm from '../components/ProductForm';

const API_BASE_URL = 'http://localhost:3000';

export interface InventoryPageProps {
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

export default function InventoryPage({ onError, onSuccess }: InventoryPageProps) {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductResponseDto | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ProductResponseDto[]>(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreateProduct = async (data: CreateProductDto) => {
    try {
      setLoading(true);
      const response = await axios.post<ProductResponseDto>(`${API_BASE_URL}/products`, data);
      setProducts(prev => [...prev, response.data]);
      setShowForm(false);
      onSuccess?.('Producto creado exitosamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear producto';
      setError(message);
      onError?.(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id: string, data: UpdateProductDto) => {
    try {
      setLoading(true);
      const response = await axios.put<ProductResponseDto>(`${API_BASE_URL}/products/${id}`, data);
      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
      setEditingProduct(null);
      setShowForm(false);
      onSuccess?.('Producto actualizado exitosamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar producto';
      setError(message);
      onError?.(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) {
      return;
    }
    try {
      setDeletingId(id);
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      onSuccess?.('Producto eliminado exitosamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar producto';
      setError(message);
      onError?.(message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (product: ProductResponseDto) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (data: CreateProductDto | UpdateProductDto) => {
    if (editingProduct) {
      await handleUpdateProduct(editingProduct.id, data as UpdateProductDto);
    } else {
      await handleCreateProduct(data as CreateProductDto);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Inventario</h1>
            <button
              onClick={handleNewProduct}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium text-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Producto
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={handleCancelForm}
              loading={loading}
            />
          </div>
        )}

        {loading && !products.length ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No hay productos</h3>
            <p className="mt-2 text-sm text-gray-500">Comience agregando un nuevo producto al inventario.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Stock: {product.stock}
                    </span>
                  </div>
                  {product.description && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400">ID: {product.id.slice(0, 8)}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={deletingId === product.id}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      {deletingId === product.id ? (
                        <svg className="w-4 h-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}