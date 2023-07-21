import TcpSocket from 'react-native-tcp-socket';

function bin2String(array: any) {
  var result = "";
  console.log(typeof array);
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

export const conectSocket = (host: string, port: number) => {
    const client = TcpSocket.createConnection({ host, port, }, () => {
      // Write on the socket
      // console.log('opa');

      // client.write('FSOC002255');

      // Close socket
      // client.destroy();
    });
    return client; 
}

