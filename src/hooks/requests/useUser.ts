import { api } from "@/services/axios/axios"
import { useQuery } from "@tanstack/react-query"


const getUserByEmail = async (email?: string) => {
  const res = await api.get<UserProps>(`/persons/${email}`)

  return res.data
}

type UserProps = {
  id: string,
  name: string,
  email: string,
  role: string
}

export const useLoggedUser = (email?: string) => {
  const query = useQuery({
    queryKey: ['get-user', email],
    queryFn: () => getUserByEmail(email),
    enabled: !!email
  })

  return query;
}
