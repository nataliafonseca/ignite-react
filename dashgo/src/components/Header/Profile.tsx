import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Natália Fonseca</Text>
          <Text color="gray.300" fontSize="small">
            nataliabf@outlook.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Natalia Fonseca" src="https://github.com/nataliafonseca.png" />
    </Flex>
  );
}
