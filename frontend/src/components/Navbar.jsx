import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg={useColorModeValue('gray.200', 'gray.700')}>
      <Container maxW="container.xl" px={4}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          h={16}
          flexDir={{
            base: 'column',
            sm: 'row',
          }}
        >
          <Text
            fontSize={{ base: '22', sm: '28' }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            <Link to="/">Product Store 🛒</Link>
          </Text>

          <HStack spacing={2} alignItems="center">
            <Link to="/create">
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Link>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <IoMoon /> : <LuSun size="20" />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
