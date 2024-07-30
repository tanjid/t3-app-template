import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ExampleScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const EmployeeScalarFieldEnumSchema = z.enum(['id','firstName','lastName','gender','createAt','updateAt']);

export const ProductScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','sku','costPrice','salePrice','stockQty','pacakgingPrice','weight','imageUrl']);

export const ShopScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','address','mobileNumber']);

export const OrderScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','invoiceNumber','totalAmount','status','shopId']);

export const OrderItemsScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','qty','price','orderId','productId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const Order_StatusSchema = z.enum(['TO_SHIP','TO_HANDOVER','SHIPPING','RETURN_REFUND','CANCELLATION','FAILED_DELIVERY','DELIVERED']);

export type Order_StatusType = `${z.infer<typeof Order_StatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// EXAMPLE SCHEMA
/////////////////////////////////////////

export const ExampleSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Example = z.infer<typeof ExampleSchema>

// EXAMPLE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ExampleOptionalDefaultsSchema = ExampleSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type ExampleOptionalDefaults = z.infer<typeof ExampleOptionalDefaultsSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
})

export type Account = z.infer<typeof AccountSchema>

// ACCOUNT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AccountOptionalDefaultsSchema = AccountSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
})

export type Session = z.infer<typeof SessionSchema>

// SESSION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SessionOptionalDefaultsSchema = SessionSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type SessionOptionalDefaults = z.infer<typeof SessionOptionalDefaultsSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

// VERIFICATION TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const VerificationTokenOptionalDefaultsSchema = VerificationTokenSchema.merge(z.object({
}))

export type VerificationTokenOptionalDefaults = z.infer<typeof VerificationTokenOptionalDefaultsSchema>

/////////////////////////////////////////
// EMPLOYEE SCHEMA
/////////////////////////////////////////

export const EmployeeSchema = z.object({
  id: z.string().cuid(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  createAt: z.date(),
  updateAt: z.date(),
})

export type Employee = z.infer<typeof EmployeeSchema>

// EMPLOYEE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const EmployeeOptionalDefaultsSchema = EmployeeSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createAt: z.date().optional(),
  updateAt: z.date().optional(),
}))

export type EmployeeOptionalDefaults = z.infer<typeof EmployeeOptionalDefaultsSchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  sku: z.string(),
  costPrice: z.number().int(),
  salePrice: z.number().int(),
  stockQty: z.number().int(),
  pacakgingPrice: z.number(),
  weight: z.number(),
  imageUrl: z.string().nullish(),
})

export type Product = z.infer<typeof ProductSchema>

// PRODUCT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ProductOptionalDefaultsSchema = ProductSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type ProductOptionalDefaults = z.infer<typeof ProductOptionalDefaultsSchema>

/////////////////////////////////////////
// SHOP SCHEMA
/////////////////////////////////////////

export const ShopSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  address: z.string(),
  mobileNumber: z.string(),
})

export type Shop = z.infer<typeof ShopSchema>

// SHOP OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ShopOptionalDefaultsSchema = ShopSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type ShopOptionalDefaults = z.infer<typeof ShopOptionalDefaultsSchema>

/////////////////////////////////////////
// ORDER SCHEMA
/////////////////////////////////////////

export const OrderSchema = z.object({
  status: Order_StatusSchema,
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  invoiceNumber: z.string(),
  totalAmount: z.number().int(),
  shopId: z.string(),
})

export type Order = z.infer<typeof OrderSchema>

// ORDER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const OrderOptionalDefaultsSchema = OrderSchema.merge(z.object({
  status: Order_StatusSchema.optional(),
  id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type OrderOptionalDefaults = z.infer<typeof OrderOptionalDefaultsSchema>

/////////////////////////////////////////
// ORDER ITEMS SCHEMA
/////////////////////////////////////////

export const OrderItemsSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  qty: z.number().int(),
  price: z.number().int(),
  orderId: z.string(),
  productId: z.string(),
})

export type OrderItems = z.infer<typeof OrderItemsSchema>

// ORDER ITEMS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const OrderItemsOptionalDefaultsSchema = OrderItemsSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type OrderItemsOptionalDefaults = z.infer<typeof OrderItemsOptionalDefaultsSchema>
