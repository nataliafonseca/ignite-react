import { Flex, Input, HStack, Text, Box, Avatar, Icon } from '@chakra-ui/react';
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from 'react-icons/ri';

export function Header() {
  return (
    <Flex as="header" w="100%" maxWidth="1480px" h="20" mx="auto" mt="4" px="6" align="center">
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

      {/* Para criar um input com ícone, a melhor forma 
      é criar um Flex as label onde será aplicado o estilo e, 
      dentro dele, um input do tipo "unstyled" e o icone */}
      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth="400px"
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: 'gray.400' }}
        />

        {/* Para utilizar um ícone de biblioteca externa no chakra, 
        importamos Icon from '@chakra-ui/react', além do ícone, e 
        utilizamos como no exemplo abaixo */}
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack spacing="8" mx="8" pr="8" py="1" color="gray.300" borderRightWidth="1px" borderColor="gray.700">
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Natália Fonseca</Text>
            <Text color="gray.300" fontSize="small">
              nataliabf@outlook.com
            </Text>
          </Box>

          {/* Quando utilizamos o componente Avatar do chackra, 
          ele automaticamente completa o espaço com as iniciais do "name", 
          se não houver foto disponível */}
          <Avatar size="md" name="Natalia Fonseca" src="https://github.com/nataliafonseca.png" />
        </Flex>
      </Flex>
    </Flex>
  );
}
