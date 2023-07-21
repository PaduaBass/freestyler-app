import { Box, Button, Text } from "native-base";
import { useFreestylerContext } from "../../context";
import { useCallback, useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";
import { Slider, Icon } from '@rneui/themed';
const Home = () => {
  const { socket, handleSetSocket, home, handleSetHome, handleWriteCommand } =
    useFreestylerContext();
  const [master, setMaster] = useState(255);
  const [fog, setFog] = useState(false);
  const [data, setData] = useState({
    blackout: false,
    freeze: false,
    favorite: false,
  });
  const sendAlterState = useRef(false);

  const handleSetData = useCallback((dataString: string) => {
    sendAlterState.current = true;
    let blackout = dataString.split(",")[1];
    let freeze = dataString.split(",")[2];
    let favorite = dataString.split(",")[3];
    setData({
      blackout: blackout === "1" ?? false,
      favorite: favorite === "1" ?? false,
      freeze: freeze === "1" ?? false,
    });
    sendAlterState.current = false;
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("data", (data: any) => {
        let dataString = Buffer.from(data, "utf-8").toString();
        if (!sendAlterState.current && dataString.length === 11) {
          handleSetData(dataString);
        }
      });
    }
  }, [socket]);
  const handleBlackout = () => {
    if (socket) {
      console.log("adsad");
      socket.write("FSBC001");
    }
  };

  const handlePressButton = (code: string) => {
    if (socket) {
      handleWriteCommand(code);
      handleWriteCommand("FSBC014");
    }
  };

  const handleDisconnect = () => {
    if (socket) {
      socket.destroy();
      handleSetSocket(undefined);
    }
  };

  return (
    <Box bg="blueGray.800" w="full" h="full" pt="10" pl="2" pr="2">
      <Text textAlign="center" color="white" bold fontSize="2xl">
        Home
      </Text>
      <Box w="full" flexDir="row">
        <Box w="80%" mt='4'>
          <Button
            onPress={() => handlePressButton("FSOC002255")}
            bg={data.blackout ? "orange.700" : "primary.600"}
            w="120px"
            h="20"
            mb='2'
            fontSize="md"
            _text={{
              bold: true,
            }}
          >
            Blackout
          </Button>

          <Button
            w="120px"
            h="20"
            mb='2'
            bg={data.freeze ? "orange.700" : "primary.600"}
            onPress={() => handlePressButton("FSOC123255")}
            fontSize="md"
            _text={{
              bold: true,
            }}
          >
            Freeze
          </Button>

          <Button
            w="120px"
            h="20"
            mb='2'
            bg={data.favorite ? "orange.700" : "primary.600"}
            onPress={() => handlePressButton("FSOC001255")}
            fontSize="md"
            _text={{
              bold: true,
            }}
          >
            Favorite
          </Button>
         <Box>
           <Button
            w="120px"
            h="20"
            mb='2'
            bg={fog ? "orange.700" : "primary.600"}
            onPress={() => {
              if(fog) {
                handlePressButton('FSOC1760');
                setFog(state => !state);
              } else {
                handlePressButton('FSOC176255');
                setFog(state => !state);
              }
            }}
            fontSize="md"
            _text={{
              bold: true,
            }}
          >
            Fog
          </Button>
          {/* <Slider w="3/4" maxW="100" defaultValue={70} minValue={0} maxValue={100} accessibilityLabel="hello world" step={10}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider> */}
         </Box>
    
        </Box>
        <Box w="20%" height='95%' alignItems='center'>
        <Text bold  color='white' mb='4'>{Number(255 - master).toFixed(0)}</Text>
        <Slider
          value={master}
          onSlidingComplete={setMaster}
          maximumValue={255}
          minimumValue={0}
          onValueChange={value => handleWriteCommand(`FSOC155${Number(255 - value).toFixed(0)}`)}
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
        <Text color='white' textAlign='center' bold>Master</Text>
        </Box>
      </Box>

      {/* <Button onPress={handleBlackout}>Blackout</Button>
          <Button onPress={handleBlackout1}>Blackout1</Button>
          <Button onPress={handleBlackout2}>Blackout2</Button>

          <Button onPress={handleDisconnect}>Disconect</Button> */}
    </Box>
  );
};

export default Home;
