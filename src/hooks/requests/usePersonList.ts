import { PersonToTableList } from "@/models"
import { api } from "@/services/axios/axios"
import { useQuery } from "@tanstack/react-query"

const getPersons = async () => {
  const res = await api.get<PersonToTableList[] | null>(`/persons`)
  return res.data
}

export const usePersonList = () => {
  const query = useQuery({
    queryKey: ['get-person-list'],
    queryFn: () => getPersons(),
  })

  const { data, isError } = query;
  return { data, isError };
}
