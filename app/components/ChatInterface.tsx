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
            Chat component will go here
        </div>
    );
};

export default ChatInterface;