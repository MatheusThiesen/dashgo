import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { api } from "../api";

export type User = {
  id: string;
  name: string;
  email: string;
  createAt: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<{ users: User[] }>("/users", {
    params: { page },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    ...user,
    createAt: new Date(user.createAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { users, totalCount };
}

export function useUsers(
  page: number,
  options: UseQueryOptions<GetUsersResponse>
) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 Minutos
    ...options,
  });
}
