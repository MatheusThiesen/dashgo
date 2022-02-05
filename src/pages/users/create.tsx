import {
  Box,
  Flex,
  Heading,
  Divider,
  HStack,
  VStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "react-query";
import { api } from "../../service/api";
import { queryClient } from "../../service/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserFormSchema = Yup.object().shape({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: Yup.string()
    .required("Senha obrigatório")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: Yup.string().oneOf(
    [null, Yup.ref("password")],
    "As senhas precisam ser iguais"
  ),
});

export default function UserCreate() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });
  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data);

    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" bg="gray.700" />

          <VStack>
            <SimpleGrid spacing={["6", "8"]} minChildWidth={240} w="100%">
              <Input
                name="name"
                label="Nome completo"
                {...register("name")}
                error={errors?.name}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register("email")}
                error={errors?.email}
              />
            </SimpleGrid>
            <SimpleGrid spacing={["6", "8"]} minChildWidth={240} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register("password")}
                error={errors?.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Conrfimação senha"
                {...register("password_confirmation")}
                error={errors?.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack>
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
