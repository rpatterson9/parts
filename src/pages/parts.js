import { useState } from 'react';
import { Grid, GridItem, Input, Button, FormControl, FormLabel, Text } from '@chakra-ui/react';

export default function Home() {
  const [partsData, setPartsData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handlePartInput = (boxNumber, partName) => {
    setPartsData({ ...partsData, [boxNumber]: partName });
  };

  const handleSearch = () => {
    const boxNumber = Object.keys(partsData).find(key => partsData[key].toLowerCase() === searchTerm.toLowerCase());
    setSearchResult(boxNumber ? `Part found in box ${boxNumber}` : "Part not found");
  };

  return (
    <div>
      <FormControl>
        <FormLabel htmlFor='search-part'>Search for a part</FormLabel>
        <Input 
          id='search-part'
          placeholder="Enter part name" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Button mt={2} onClick={handleSearch}>Search</Button>
        {searchResult && <Text mt={2}>{searchResult}</Text>}
      </FormControl>

      <Grid templateColumns="repeat(20, 1fr)" gap={4} mt={4}>
        {[...Array(400)].map((_, index) => {
          const boxNumber = index + 1;
          return (
            <GridItem key={boxNumber} w="100%" h="10">
              <FormControl>
                <FormLabel htmlFor={`part-box-${boxNumber}`}>Box {boxNumber}</FormLabel>
                <Input 
                  id={`part-box-${boxNumber}`}
                  placeholder="Enter part name" 
                  onBlur={(e) => handlePartInput(boxNumber, e.target.value)} 
                />
              </FormControl>
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}
