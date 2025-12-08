import React from 'react';
import Total from '../components/Total';
import { Event as AppEvent } from '../types';

interface TotalPageProps {
    events: AppEvent[];
}

const TotalPage: React.FC<TotalPageProps> = ({ events }) => {
    return (
        <div className="space-y-6">
            <Total events={events} />
        </div>
    );
};

export default TotalPage;
