import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'

function App() {
  return (
    <Flex
      minH="100vh"
      w="100vw"
      bg={useColorModeValue('gray.100', 'gray.900')}
      flexDirection="column"
      gap={10}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Flex>
  )
}

export default App
