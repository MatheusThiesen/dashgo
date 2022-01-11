import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Matheus Thiesen</Text>
          <Text color="gray.300" fontSize="small">
            matheusreis314@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Matheus Thiesen"
        src="http://github.com/matheusthiesen.png"
      />
    </Flex>
  );
}
