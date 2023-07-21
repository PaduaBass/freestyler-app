import { FlatList } from 'react-native';
import { Box, Button, Text } from "native-base"
import { useFreestylerContext } from "../../context";
import { useCallback, useEffect, useState } from 'react';
import { Slider, Icon } from '@rneui/themed';
import VectorIcon from 'react-native-vector-icons/AntDesign';
import CircleSlider from "react-native-circle-slider";
import { Buffer } from 'buffer';

const Playbacks = () => {
    const {  socket, handleSetPlaybacks, handleWriteCommand } = useFreestylerContext();
    const [master, setMaster] = useState(205);
    const [playbacks, setPlaybacks] = useState<any>([]);


    const handleUpdateStatusSequences = (dataString: string) => {
        console.log(dataString);
        let arrayStatus = dataString.split(',');
        arrayStatus.shift();
        let playbackMock = playbacks.map((pb: any, i: number) => ({ 
            title: pb.title,
            timeScene: pb.timeScene,
            active: arrayStatus[i] === '1' ?? false,
            code: pb.code,
        }))

        console.log(playbackMock);

        setPlaybacks(playbackMock);
    };

    useEffect(() => {
        if(socket) {
            handleWriteCommand('FSBC001')
            setTimeout(() => {
                handleWriteCommand('FSBC005');
            }, 2000);
            socket.on('data', (data: any) => {
                let dataString = Buffer.from(data, 'utf-8').toString();
                if(dataString.length === 45) {
                    // status sequences
                    handleUpdateStatusSequences(dataString);
                    console.log('aqui');

                    
                }
                if(dataString.length > 21 && dataString.length !== 45) {
                    let playbackArray = dataString.split(',');
                    playbackArray.shift();
                    setPlaybacks(playbackArray.map((e, i) => ({     
                        title: e,
                        timeScene: 100,
                        active: false,
                        code: `FSOC0${46 + i}255`,
                    })));
                }
            });
        }
    }, [socket]);
    const handleButtonPress = (code: string) => {
        if(socket) {
            handleWriteCommand(code);
                handleWriteCommand('FSBC005');
        }
    }
    console.log(master)
    const renderItem = ({ item }: any) => {
        return (
            <Button _text={{
                bold: true,
                fontSize: 16,
            }} bg={item?.active ? 'orange.700' : 'primary.600'} _icon={{ position: 'absolute',  right: -100 }} rightIcon={item.title.length > 0 ? <VectorIcon color='#fff' name='play' size={25} /> : undefined} onPress={() => handleButtonPress(item.code)} mt='2' h='20' color='white'>{item.title}</Button>
        )
    }

    return <Box bg='blueGray.800'  w='full' h='full' pt='10'>
        <Text textAlign='center' color='white' bold fontSize='2xl'>Playbacks</Text>
        <Box flexDir='row'>
        <Box w='80%' pl='2'>
            <FlatList 
                data={playbacks}
                keyExtractor={({ code }) => code}
                renderItem={renderItem}
                extraData={playbacks}
                showsVerticalScrollIndicator={false}
            />
        </Box>
        <Box w='20%' height='95%'  justifyContent='center' alignItems='center'>
        <Text bold  color='white' mb='4'>{Number(255 - master).toFixed(0)}</Text>
        <Box position='absolute' w='60px' bottom='155px' height='1px' bg='#ddd'></Box>
        <Slider
          value={master}
          onSlidingComplete={setMaster}
          maximumValue={255}
          minimumValue={0}
          onValueChange={value => handleWriteCommand(`FSOC206${Number(255 - value).toFixed(0)}`)}
          allowTouchTrack
          step={5}
          orientation="vertical"
          style={{ width: '20%', height: '90%', }}
          thumbStyle={{ height: 20, width: 16, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="circle"
                type="font-awesome"
                size={15}
                reverse
                containerStyle={{ bottom: 20, right: 15 }}
                color="#e32"
              />
            ),
          }}
        />
        <Text bold color='white' >Scene Time</Text>
        </Box>
        </Box>
    </Box>
}

export default Playbacks;