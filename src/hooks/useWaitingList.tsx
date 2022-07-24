import { useContext } from 'react';
import { WaitingListContext } from '../contexts/WaitingListContext';

const useWaitingList = () => useContext(WaitingListContext);

export default useWaitingList;