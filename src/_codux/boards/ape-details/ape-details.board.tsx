import React from 'react';
import { createBoard } from '@wixc3/react-board';
import ApeDetails from '../../../components/ApeDetails';

export default createBoard({
    name: 'ApeDetails',
    Board: () => <ApeDetails />
});
