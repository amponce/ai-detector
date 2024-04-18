import React from 'react';
import { Model } from '../types/Model';


interface InstructInterfaceProps {
    model: Model;
  }


const InstructInterface: React.FC<InstructInterfaceProps> = ({model}) => {
    return (
        <div>
            Instruct component will go here
        </div>
    );
};

export default InstructInterface;