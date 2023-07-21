import { Box, Button, FlatList, Text } from "native-base"
import { useFreestylerContext } from "../../context";

const Overrides = () => {
    const { buttons, socket, handleSetPlaybacks, handleWriteCommand } = useFreestylerContext();

    const handleButtonPress = (code: string) => {
        if(socket) {
            handleWriteCommand(code);    
        }
    }

    const renderItem = ({ item, index }: any) => {
    
        return (
              <Button w='48.9%' rounded='10px' mr={index % 2 !== 0 ? 0 : 2}  bg={item.active ? 'primary.900' : 'primary.600'} onPress={() => handleButtonPress(item.code)} mt='2' h='20' color='white'>{item.title}</Button>
        )
    }
    
    return <Box bg='blueGray.800' w='full' h='full' pt='10' pl='2' pr='2'>
    <Text textAlign='center' color='white' bold fontSize='2xl'>Overrrides</Text>
       <Box justifyContent='center' h='95%' w='full' alignItems='center'>
        <FlatList
                data={buttons}
                keyExtractor={({ code }) => code}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
       </Box>
</Box>
}

export default Overrides;