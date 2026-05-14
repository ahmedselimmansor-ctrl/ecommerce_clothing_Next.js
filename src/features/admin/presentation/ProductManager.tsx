'use client';

import { useState, useTransition } from 'react';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { Plus, Edit2, Trash2, Star, X, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { createProductAction, updateProductAction, deleteProductAction, toggleFeaturedAction, uploadProductImageAction } from '../application/admin.service';

export function ProductManager({
  products,
  categories,
  dict,
}: {
  products: any[];
  categories: any[];
  dict: Dictionary;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: categories[0]?.id || '',
    sizes: 'S,M,L,XL',
    colors: 'Black,White,Navy',
    stock: '10',
    featured: false,
  });

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price.toString(),
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        sizes: product.sizes.join(','),
        colors: product.colors.join(','),
        stock: product.stock.toString(),
        featured: product.featured,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: '',
        imageUrl: '',
        categoryId: categories[0]?.id || '',
        sizes: 'S,M,L,XL',
        colors: 'Black,White,Navy',
        stock: '10',
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await uploadProductImageAction(data);
      if (res.error) {
        toast.error(res.error);
      } else if (res.secureUrl) {
        setFormData((prev) => ({ ...prev, imageUrl: res.secureUrl }));
        toast.success('Image uploaded to Cloudinary successfully!');
      }
    } catch (err) {
      toast.error('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,
        categoryId: formData.categoryId,
        sizes: formData.sizes.split(',').map((s) => s.trim()),
        colors: formData.colors.split(',').map((c) => c.trim()),
        stock: parseInt(formData.stock),
        featured: formData.featured,
      };

      if (editingProduct) {
        const res = await updateProductAction({ id: editingProduct.id, ...payload });
        if (res.error) toast.error(res.error);
        else {
          toast.success('Product updated successfully in Neon Database!');
          setIsModalOpen(false);
        }
      } else {
        const res = await createProductAction(payload);
        if (res.error) toast.error(res.error);
        else {
          toast.success('Product created successfully in Neon Database!');
          setIsModalOpen(false);
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    startTransition(async () => {
      const res = await deleteProductAction(id);
      if (res.error) toast.error(res.error);
      else toast.success('Product deleted successfully from Neon Database!');
    });
  };

  const handleToggleFeatured = (id: string) => {
    startTransition(async () => {
      const res = await toggleFeaturedAction(id);
      if (res.error) toast.error(res.error);
      else toast.success('Featured status updated in Neon Database!');
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{dict.admin.products}</h2>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 shadow cursor-pointer gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{dict.admin.addProduct}</span>
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-100/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">{dict.admin.price}</th>
                <th className="p-4">{dict.admin.stock}</th>
                <th className="p-4">{dict.admin.featured}</th>
                <th className="p-4 text-right">{dict.admin.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:border-zinc-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-50">{product.name}</h4>
                      <span className="text-xs text-zinc-500 font-mono">{product.slug}</span>
                    </div>
                  </td>
                  <td className="p-4 font-normal text-zinc-600 dark:text-zinc-400">
                    {product.category?.name || '—'}
                  </td>
                  <td className="p-4 font-medium text-zinc-900 dark:text-zinc-50">${product.price.toFixed(2)}</td>
                  <td className="p-4 font-medium text-zinc-900 dark:text-zinc-50">{product.stock}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFeatured(product.id)}
                      className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                        product.featured
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border-amber-200 dark:border-amber-800'
                          : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shadcn UI Style Dialog / Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {editingProduct ? 'Edit Product' : dict.admin.addProduct}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.name}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.slug}</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.description}</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="flex w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.price}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.stock}</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Product Image (Cloudinary Media Upload / URL)</label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="relative w-full sm:w-1/2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 dark:file:bg-zinc-800 file:text-zinc-900 dark:file:text-white hover:file:bg-zinc-200 dark:hover:file:bg-zinc-700 cursor-pointer border border-zinc-200 dark:border-zinc-800 rounded-md p-1.5 bg-white dark:bg-zinc-950"
                    />
                    {isUploading && (
                      <span className="absolute right-3 top-3 text-xs text-indigo-600 font-bold animate-pulse">Uploading to Cloudinary...</span>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="Or paste direct image URL"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="flex h-10 w-full sm:w-1/2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.sizes}</label>
                  <input
                    type="text"
                    required
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.colors}</label>
                  <input
                    type="text"
                    required
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-zinc-900 border-zinc-200 dark:border-zinc-800 cursor-pointer"
                />
                <label htmlFor="featured" className="font-medium text-sm text-zinc-900 dark:text-zinc-50 cursor-pointer">
                  Featured Product
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 h-10 px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  {dict.admin.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isPending || isUploading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 shadow cursor-pointer"
                >
                  {isPending ? 'Saving...' : dict.admin.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
