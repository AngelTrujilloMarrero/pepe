import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Music2, Download, Navigation } from 'lucide-react';
import { Event } from '../types';
import { groupEventsByDay, sortEventsByDateTime, formatDayName, getLastUpdateDate } from '../utils/helpers';

interface EventsListProps {
  events: Event[];
  onExportWeek: (startDate?: string, endDate?: string) => void;
  onExportFestival: () => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, onExportWeek, onExportFestival }) => {
  const [showDatePickers, setShowDatePickers] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const eventsByDay = groupEventsByDay(events);
  const sortedEvents = sortEventsByDateTime(events);
  const lastUpdate = getLastUpdateDate(sortedEvents);

  const handleExportClick = () => {
    if (showDatePickers && startDate && endDate) {
      onExportWeek(startDate, endDate);
    } else {
      setShowDatePickers(!showDatePickers);
    }
  };

  const generateDirectionsLink = (event: Event) => {
    const address = event.lugar ? `${event.lugar}, ${event.municipio}, Tenerife` : `${event.municipio}, Tenerife`;
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-3">
          <Calendar className="w-8 h-8" />
          Próximas Verbenas
          <Music2 className="w-8 h-8" />
        </h2>
      </div>

      {/* Events List */}
      <div className="p-6 space-y-6">
        {Object.entries(eventsByDay)
          .sort(([dayKeyA], [dayKeyB]) => new Date(dayKeyA).getTime() - new Date(dayKeyB).getTime())
          .map(([dayKey, dayEvents]) => {
            const dayDate = new Date(dayKey);
            const dayName = formatDayName(dayDate);

            const sortedDayEvents = sortEventsByDateTime(dayEvents);

            return (
              <div key={dayKey} className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-6 py-2 bg-gradient-to-r from-yellow-400/10 to-transparent">
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-400 flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    {dayName}
                  </h3>
                </div>

                <div className="space-y-3 ml-6">
                  {sortedDayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <div className="flex flex-wrap items-center gap-4 text-center md:text-left min-w-0 overflow-hidden">
                        <div className="flex items-center gap-2 text-blue-300 font-bold">
                          <Clock className="w-5 h-5" />
                          <span className="text-lg">{event.hora}H</span>
                        </div>

                        {event.tipo !== 'Baile Normal' && (
                          <div className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                            {event.tipo}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="w-5 h-5" />
                          <span>
                            {event.lugar ? `${event.lugar}, ` : ''}{event.municipio}
                          </span>
                        </div>

                        <a
                          href={generateDirectionsLink(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 rounded-lg text-sm font-medium border border-emerald-500/30 hover:from-emerald-500/30 hover:to-teal-500/30 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
                          title={`Cómo llegar a ${event.lugar ? event.lugar + ', ' : ''}${event.municipio}`}
                        >
                          <Navigation className="w-4 h-4" />
                          <span className="hidden sm:inline">Cómo llegar</span>
                        </a>

                        <div className="flex items-center gap-2 text-green-400 font-semibold min-w-0 max-w-full overflow-hidden">
                          <Music2 className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed min-w-0 orchestra-names-container">
                            {event.orquesta.split(',').map((orquesta, index, arr) => (
                              <span key={index} className="orchestra-name-unit">
                                {orquesta.trim()}
                                {index < arr.length - 1 && <span className="orchestra-separator">,</span>}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 space-y-4">
        <div className="text-center text-green-400 font-bold text-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Última actualización: {lastUpdate}
          </div>
        </div>

        {/* Export Section */}
        <div className="flex flex-col items-center gap-4">
          {showDatePickers && (
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-700/50 p-4 rounded-lg">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">Fecha de inicio</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">Fecha de fin</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg p-2 text-white"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleExportClick}
              disabled={showDatePickers && (!startDate || !endDate)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              {showDatePickers ? 'Generar Imagen' : 'Exportar por fechas'}
            </button>

            <button
              onClick={onExportFestival}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              Exportar fiesta específica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
