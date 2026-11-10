import { useState, useEffect, FormEvent } from 'react';
import { ProductResponseDto, CreateProductDto, UpdateProductDto } from '../App';

interface ProductFormProps {
  product: ProductResponseDto | null;
  onSubmit: (data: CreateProductDto | UpdateProductDto) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  sku: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
  sku?: string;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  price: '',
  stock: '',
  sku: ''
};

export default function ProductForm({ product, onSubmit, onCancel, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        stock: product.stock.toString(),
        sku: product.sku || ''
      });
    } else {
      setFormData(initialFormData);
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    const priceNum = parseFloat(formData.price);
    if (!formData.price || isNaN(priceNum)) {
      newErrors.price = 'El precio es obligatorio';
    } else if (priceNum <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    } else if (priceNum > 999999.99) {
      newErrors.price = 'El precio no puede exceder 999,999.99';
    }

    const stockNum = parseInt(formData.stock, 10);
    if (!formData.stock || isNaN(stockNum)) {
      newErrors.stock = 'El stock es obligatorio';
    } else if (stockNum < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    } else if (stockNum > 999999) {
      newErrors.stock = 'El stock no puede exceder 999,999';
    }

    if (!product && !formData.sku.trim()) {
      newErrors.sku = 'El SKU es obligatorio para nuevos productos';
    } else if (formData.sku.length > 50) {
      newErrors.sku = 'El SKU no puede exceder 50 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const submitData: CreateProductDto | UpdateProductDto = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        ...(formData.sku.trim() && { sku: formData.sku.trim() })
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error al guardar producto:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = (error?: string) => `
    block w-full rounded-md border-gray-300 shadow-sm
    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
  `;

  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Nombre del Producto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading || submitting}
            className={inputClasses(errors.name)}
            placeholder="Ingrese el nombre del producto"
            maxLength={100}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="sku" className={labelClasses}>
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            disabled={loading || submitting || !!product}
            className={inputClasses(errors.sku)}
            placeholder="Código único del producto"
            maxLength={50}
          />
          {errors.sku && (
            <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
          )}
          {product && (
            <p className="mt-1 text-xs text-gray-500">El SKU no se puede modificar</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className={labelClasses}>
            Precio <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading || submitting}
              className={`${inputClasses(errors.price)} pl-7`}
              placeholder="0.00"
              step="0.01"
              min="0"
              max="999999.99"
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className={labelClasses}>
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            disabled={loading || submitting}
            className={inputClasses(errors.stock)}
            placeholder="Cantidad en inventario"
            min="0"
            max="999999"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading || submitting}
          rows={3}
          className={inputClasses()}
          placeholder="Descripción opcional del producto"
          maxLength={500}
        />
        <p className="mt-1 text-xs text-gray-500">
          {formData.description.length}/500 caracteres
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading || submitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || submitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
        >
          {submitting && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {product ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
}