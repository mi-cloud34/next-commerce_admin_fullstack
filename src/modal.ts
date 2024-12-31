type CategoryType = {
  _id: string;
  name: string;
  imgUrl: string;
};

type ProductType = {
  _id: string;
  name: string;
  description: string;
  imgUrls: [string];
  inStock: number;
  categoryId: CategoryType;
  price: number;
  brand: string;
  rating: number;
  colors: [string];
  createdAt: string;
  updatedAt: string;
  reviews: [ReviewType];
};

type UserType = {
  _id: string;
  name: string;
  email: string;
  surname: string;
  isAdmin: boolean;
  password: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  forgotPasswordToken: String;
  forgotPasswordTokenExpiry: Date;
  verifyToken: String;
  verifyTokenExpiry: Date;
};
type ReviewType = {
  createdAt: string;
  comment: string;
  rating: string;
  productId: ProductType;
  userId: UserType;
};
type OrderType = {
  shippingAddress: Object;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType];
  shippingRate: string;
  totalAmount: number;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
};
