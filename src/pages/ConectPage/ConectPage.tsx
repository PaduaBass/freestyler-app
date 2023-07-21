import React, { useState, useContext } from 'react';
import { Box, Button, Text } from "native-base"
import Conect from "../../components/Conect/Conect"
import { Input } from "native-base";
import { FreestylerContext, Playback } from '../../context';
import { conectSocket } from '../../services/socket';

const ConectPage = () => {

    const { handleSetSocket, socket } = useContext(FreestylerContext);
    const [data, setData] = useState({
        host: '10.0.0.131',
        port: 3333,
      });

        const handleConect = () => {
        if(data.host.length > 7) {
        if(!socket) {
            const client = conectSocket(data.host, data.port);
            handleSetSocket(client); 

        }

        }
    }
    
    return <Box w='full' h='full' justifyContent='center' pl='10' pr='10' bg='blueGray.800'>
        <Text bold color='white' fontSize='2xl' textAlign='center'>Freestyler Remote</Text>
        <Input value={data.host} placeholder="IP" mb='2' color='#fff' onChangeText={(e: string) => setData({ host: e, port: data.port })} />
        <Input value={String(data.port)} placeholder="Porta" mb='2' keyboardType='number-pad' color='#fff' onChangeText={(e: string) => setData({ host: data.host, port: Number(e) })} />

        <Button onPress={handleConect}>Conectar</Button>
    </Box>
}

export default ConectPage;