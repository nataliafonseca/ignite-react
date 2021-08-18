import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('O campo nome é obrigatório.'),
  email: yup.string().required('O campo e-mail é obrigatório.').email('E-mail inválido.'),
  password: yup.string().required('O campo senha é obrigatório.').min(6, 'A senha deve conter ao menos 6 caracteres.'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas não conferem.'),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('/users', {
      user: {
        ...user,
        created_at: new Date(),
      },
    });

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(createUserFormSchema) });
  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values, event) => {
    await createUser.mutateAsync(values);

    router.push('/users')
  };

  return (
    <Box>
      <Header />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius="8px"
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={['6', '8']}>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input name="name" label="Nome completo" error={errors.name} {...register('name')} />
              <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" isLoading={formState.isSubmitting} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
