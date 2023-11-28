import React, { useState, useEffect } from 'react';
import {
    Input,
    Button,
    Text,
    Center,
    Container,
    Flex,
    FormControl, FormLabel, VStack, HStack, Grid, GridItem, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { firestore } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { query, getDocs } from 'firebase/firestore';




export default function PartsInventory() {
    const [partsData, setPartsData] = useState({});
    const [newPart, setNewPart] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedBox, setHighlightedBox] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedBox, setSelectedBox] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(firestore, 'parts'));
                const querySnapshot = await getDocs(q);
                const parts = {};
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Assuming 'location' is a field in your parts documents
                    if (data.location) {
                        if (!parts[data.location]) {
                            parts[data.location] = [];
                        }
                        parts[data.location].push(data.name);
                    }
                });
                setPartsData(parts);
            } catch (error) {
                console.error("Error fetching parts data: ", error);
            }
        };

        fetchData();
    }, []);
    const handleAddPart = async () => {
        if (newLocation < 1 || newLocation > 100) {
            alert("Location must be between 1 and 100.");
            return;
        }

        try {
            // Define a new part object
            const newPartData = {
                name: newPart,
                location: newLocation
            };

            // Add the new part to the 'parts' collection
            await addDoc(collection(firestore, 'parts'), newPartData);

            // Optionally, fetch the latest data from Firestore or update local state
            // ...

            setNewPart('');
            setNewLocation('');
        } catch (error) {
            console.error("Error adding part: ", error);
        }
    };
    const handleBoxClick = (boxNumber) => {
        // Your logic when a box is clicked
        // For example, setting the selected box and opening a modal
        setSelectedBox(boxNumber);
        onOpen();
    };


    const handleSearch = () => {
        const location = Object.keys(partsData).find(key =>
            partsData[key].includes(searchTerm.toLowerCase())
        );
        console.log(location);
        setHighlightedBox(location || null);
    };


    return (
        <Container maxW="container.lg" mx="auto" px={2} bg="#000">
            <VStack spacing={4} bg="black" p={4}>
                {/* Form for adding parts */}
                <FormControl>
                    <Flex justifyContent="center">
                        <HStack spacing={4}>
                            <VStack>

                                <Input
                                    id='part-name'
                                    value={newPart}
                                    onChange={(e) => setNewPart(e.target.value)}
                                    placeholder="Enter part name"
                                />
                            </VStack>
                            <VStack>

                                <Input
                                    id='part-location'
                                    type="number"
                                    value={newLocation}
                                    onChange={(e) => setNewLocation(e.target.value)}
                                    placeholder="Enter box number"
                                />
                            </VStack>
                            <Button
                                variant="outline"
                                bg="transparent"
                                color={"#ff1100"}
                                onClick={handleAddPart}>Add Part</Button>
                        </HStack>
                    </Flex>
                </FormControl>

                {/* Search functionality */}
                <FormControl>
                    <Flex alignItems="center" justifyContent="center">

                        <Input
                            id='search-part'
                            w="200px"
                            variant={searchTerm ? "solid" : "outline"}

                            placeholder="Enter part name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            mr={2}
                        />
                        <Button variant="outline" color="#fff" onClick={handleSearch}>Search</Button>
                    </Flex>
                </FormControl>


                <Grid templateColumns="repeat(10, 100px)" gap={2}>
                    {[...Array(100)].map((_, index) => {
                        const boxNumber = index + 1;
                        const isHighlighted = boxNumber.toString() === highlightedBox;
                        return (
                            <GridItem key={boxNumber} w="100px" h="100px">
                                <Box w="100px" h="100px"
                                    bg={isHighlighted ? '#ff1100' : '#333'}
                                    border="1px solid"
                                    borderColor={isHighlighted ? 'green.500' : 'gray.200'}
                                    borderRadius={8}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    onClick={() => handleBoxClick(boxNumber)}>
                                    <Text fontSize="md">{boxNumber}</Text>
                                </Box>
                            </GridItem>
                        );
                    })}
                </Grid>




                {/* Modal for displaying parts in a box */}
                <Modal isOpen={isOpen} onClose={onClose} size="lg" bg="#000">
                    <ModalOverlay bg="#000" backdropFilter="blur(10px)" />
                    <ModalContent w="400px" h="400px" bg="#000"
                        border="1px solid"
                        borderColor="#ff1100"
                        borderRadius={8}

                    >
                        <ModalHeader color="#ff1100">Contents of Box {selectedBox}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody color="#ff1100">
                            <Center h="full" display="flex" alignItems="center" justifyContent="center">
                                {partsData[selectedBox] ? partsData[selectedBox].join(', ') : 'No parts in this box.'}
                            </Center>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </VStack>
        </Container>
    );
}
