import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import InventoryPage from './pages/InventoryPage';

export interface ProductResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductResponseDto[]>('http://localhost:3000/products');
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async (product: CreateProductDto) => {
    try {
      const response = await axios.post<ProductResponseDto>('http://localhost:3000/products', product);
      setProducts([...products, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear producto');
    }
  };

  const handleUpdateProduct = async (id: string, product: UpdateProductDto) => {
    try {
      const response = await axios.put<ProductResponseDto>(`http://localhost:3000/products/${id}`, product);
      setProducts(products.map(p => (p.id === id ? response.data : p)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar producto');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar producto');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <InventoryPage
              products={products}
              onCreateProduct={handleCreateProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;