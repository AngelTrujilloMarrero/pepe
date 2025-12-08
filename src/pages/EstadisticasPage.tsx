import React from 'react';
import Statistics from '../components/Statistics';
import { Event as AppEvent } from '../types';

interface EstadisticasPageProps {
    events: AppEvent[];
}

const EstadisticasPage: React.FC<EstadisticasPageProps> = ({ events }) => {
    return (
        <div className="space-y-6">
            <Statistics events={events} />
        </div>
    );
};

export default EstadisticasPage;
