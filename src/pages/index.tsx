import { Flex, Button, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { Input } from "../components/Form/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = Yup.object().shape({
  email: Yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: Yup.string().required("Senha obrigatório"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const HandleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxW={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(HandleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              label="E-mail"
              type="email"
              error={errors?.email}
              {...register("email")}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              error={errors?.password}
              {...register("password")}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
