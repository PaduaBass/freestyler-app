import { Box, Slider, Text } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type ButtonProps = {
    title?: string;
}
const ButtonPlayback = ({ title }: ButtonProps) => {
  const [pressed, setPresButtonsed] = useState(false);
  const [value, setValue] = useState(100);

  return (
    <Box flexDir='row'>
     <TouchableOpacity onPress={() => setPressed(state => !state)}>
        <Box ml='2' bg={pressed ? '#1C80F0' : '#253551'} w='200' h='80px' borderLeftRadius='10'  mt='2' justifyContent='center' alignItems='center'>
            <Text bold color='#fff' >{title}</Text>
        </Box>
      </TouchableOpacity>
      <Box w='100px' h='80px' bg='#253551' borderRightRadius='10' mt='2' justifyContent='center' alignItems='center'>
        <Text bold color='#fff'>{value}%</Text>
        <Slider pointerEvents="auto"   w="3/4" maxW="300" defaultValue={100} value={value} onChange={v => setValue(v)} onPointerDown={() => console.log('opa')} minValue={0} maxValue={500} >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
            <Slider.Thumb />
        </Slider>
        <Text>Reset</Text>
      </Box>
    </Box>
  );
}

export default ButtonPlayback;