import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import Socket from "react-native-tcp-socket/lib/types/Socket";
import { Buffer } from 'buffer';


export interface Playback {
    title: string;
    timeScene: number;
    active: boolean;
    code: string;
};

export interface Button {
    title: string;
    active: boolean;
    code: string;
}

export interface Home {
    blackout: boolean;
    freeze: boolean;
    dimmer: number;
    fog: number;
    fogActive: boolean;
    favorite: boolean;
}
interface FreestylerContextProps {
   playbacks: Playback[]
    buttons: Button[];
    home: Home;
    handleSetPlaybacks: (playbacks: Playback[]) => void;
    handleSetButtons: (buttons: Button[]) => void;
    handleSetHome: (home: Home) => void;
    handleSetSocket: (socketClient: Socket | undefined) => void;
    handleWriteCommand: (code: string, cb?: (data: string) => void) => void;
    socket: Socket | undefined;
}

const FreestylerContext = createContext<FreestylerContextProps>({} as FreestylerContextProps);

const FreestylerProvider = ({ children }: { children: ReactNode }) => {
    const [playbacks, setPlaybacks] = useState<Playback[]>([]);
    const [buttons, setButtons] = useState<Button[]>([]);
    const [socket, setSocket] = useState<Socket>();
    let playbackSend = false;
    let playbackSet = false;
    let buttonsSend = false;

    const [home, setHome] = useState<Home>({
        blackout: false,
        dimmer: 100,
        fog:  100,
        fogActive: false,
        freeze: false,
        favorite: false,
    });


    const handleWriteCommand = (code: string, cb?: (data: string) => void) => {
        try {
            if(socket) {
                socket.write(code, 'ascii', (err) => {
                   cb && cb('');

                });
            }
        } catch (e) {
            if(socket) {
                // socket.off('close');
                socket.destroy();
                setSocket(undefined);
            } 
            console.log(e);

        }

    }

    const handleSetPlaybacks = (playbacks: Playback[]) => {
        setPlaybacks(playbacks);
    };

    
    const handleSetButtons = (buttons: Button[]) => {
        setButtons(buttons);
    };

    
    const handleSetHome = (home: Home) => {
        setHome(home);
    };

    const handleSetSocket = (socketClient: Socket | undefined) => {
        setSocket(socketClient);
    }

    useEffect(() => {
      if(socket) {
          socket.on('error', function (error) {
            console.log(error);
          });
      
          socket.on('close', function () {
            console.log('Connection closed!');
          });
      }
      return () => {
        if(socket) socket.end();
      }
    }, [socket])

    console.log('playback', playbacks);

    return <FreestylerContext.Provider value={{ buttons, socket, home, playbacks, handleSetPlaybacks, handleSetButtons, handleSetHome, handleSetSocket, handleWriteCommand }}>
        {children}
    </FreestylerContext.Provider>
}

const useFreestylerContext = () => {
  const context = useContext(FreestylerContext);
  if(!context) {
    throw new Error('Freestyler context not defined')
  }
  return context;
};

export { FreestylerProvider, FreestylerContext, useFreestylerContext };