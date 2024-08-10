export interface Person {
    id: string
    name: string
    document: string
    phone: string
    email: string
    birthdate: string
    location?: {
      address?: string
      number?: string
      complement?: string
      city?: string
      state?: string
    }
}
