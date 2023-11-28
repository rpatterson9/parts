import React, { useState } from 'react';
import { Input, Button, FormControl, FormLabel, VStack, HStack, Grid, GridItem, Box } from '@chakra-ui/react';

export default function PartsInventory() {
  const [partsData, setPartsData] = useState({});
  const [newPart, setNewPart] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedBox, setHighlightedBox] = useState(null);

  const handleAddPart = () => {
    if (newLocation < 1 || newLocation > 100) {
      alert("Location must be between 1 and 100.");
      return;
    }
    setPartsData({ ...partsData, [newLocation]: newPart });
    setNewPart('');
    setNewLocation('');
  };

  const handleSearch = () => {
    const location = Object.keys(partsData).find(key => partsData[key].toLowerCase() === searchTerm.toLowerCase());
    setHighlightedBox(location || null);
  };

  return (
    <VStack spacing={4}>
      {/* Form for adding parts */}
      <FormControl>
        <HStack>
          <VStack>
            <FormLabel htmlFor='part-name'>Part Name</FormLabel>
            <Input 
              id='part-name'
              value={newPart}
              onChange={(e) => setNewPart(e.target.value)}
              placeholder="Enter part name" 
            />
          </VStack>
          <VStack>
            <FormLabel htmlFor='part-location'>Location (1-100)</FormLabel>
            <Input 
              id='part-location'
              type="number"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Enter box number" 
            />
          </VStack>
        </HStack>
        <Button mt={2} onClick={handleAddPart}>Add Part</Button>
      </FormControl>

      {/* Search functionality */}
      <FormControl>
        <FormLabel htmlFor='search-part'>Search for a part</FormLabel>
        <Input 
          id='search-part'
          placeholder="Enter part name" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Button mt={2} onClick={handleSearch}>Search</Button>
      </FormControl>

      {/* Grid visualization */}
      <Grid templateColumns="repeat(10, 200px)" gap={4}>
        {[...Array(100)].map((_, index) => {
          const boxNumber = index + 1;
          const isHighlighted = boxNumber.toString() === highlightedBox;
          return (
            <GridItem key={boxNumber} w="200px" h="100px">
              <Box 
                border="1px solid"
                borderColor={isHighlighted ? 'green.500' : 'gray.200'}
                bg={isHighlighted ? 'green.300' : 'white'}
                borderRadius="4px"
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                fontSize="14px"
                color={isHighlighted ? 'white' : 'black'}
              >
                {isHighlighted && partsData[highlightedBox]}
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
}
