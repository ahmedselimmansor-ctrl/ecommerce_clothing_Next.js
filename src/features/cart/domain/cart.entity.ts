export interface CartItemEntity {
  id: string; // Unique combination of productId + size + color
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  size: string;
  color: string;
  quantity: number;
}
