import React from 'react';
import MapComponent from '../components/MapComponent';
import { Event as AppEvent } from '../types';

interface MapaPageProps {
    events: AppEvent[];
}

const MapaPage: React.FC<MapaPageProps> = ({ events }) => {
    return (
        <div className="space-y-6">
            <MapComponent events={events} />
        </div>
    );
};

export default MapaPage;
