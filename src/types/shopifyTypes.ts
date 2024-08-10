export type ShopifyCustomerT = {
    id: number
    addresses: ShopifyAddressT[] | []
    default_address: ShopifyAddressT | null
    created_at: string
    updated_at: string
    email: string | null
    first_name: string | null
    last_name: string | null
    last_order_id: number | null
    note: string
    orders_count: number
    phone: string
    state: any
    tags: string  | null
    total_spent: string
    verified_email: boolean
    formatted_address?: string | undefined
    shopifyId?: number | null
}
export type ShopifyAddressT = {
    id: number
    address1: string | null
    address2: string | null
    city: string | null
    company: string | null
    country: string | null
    country_code: string | null
    customer_id: number
    first_name: string | null
    last_name: string | null
    name: string | null
    phone: string | null
    province: string | null
    province_code: string | null
    zip: string | null
}