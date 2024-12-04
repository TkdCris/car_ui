import { api } from "@/services/axios/axios"

export function getAddressByZipCode(zipcode: string) {
  return api.get(`${process.env.NEXT_PUBLIC_CEP_BASE_URL}/${zipcode}`)
}
