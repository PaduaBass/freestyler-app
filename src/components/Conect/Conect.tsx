import { Box, Button, Input } from 'native-base';
import React from 'react';

const Conect = ({ children }: { children: ChildNode }) => {
  return <Box w='full' paddingLeft='10' paddingRight='10' justifyContent='center' alignItems='center' h='full' bg='#20232B'>
    {children}
  </Box>;
}

export default Conect;