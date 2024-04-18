import React from 'react';

import { Model } from '../types/Model';


interface ChatInterfaceProps {
    model: Model;
  }


const ChatInterface: React.FC<ChatInterfaceProps> = ({model}) => {
    // Add your component logic here

    return (
        // Add your JSX markup here
        <div>
            {/* Add your component content here */}
        </div>
    );
};

export default ChatInterface;