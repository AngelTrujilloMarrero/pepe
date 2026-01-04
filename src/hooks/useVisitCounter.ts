import { useState, useEffect } from 'react';
import { get, set, visitCountRef } from '../utils/firebase';

export function useVisitCounter() {
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    const updateVisitCount = async () => {
      try {
        const snapshot = await get(visitCountRef);
        const count = snapshot.val() || 0;
        setVisitCount(count);
        await set(visitCountRef, count + 1);
      } catch (error) {
        console.error('Error al manejar el contador de visitas:', error);
      }
    };

    updateVisitCount();
  }, []);

  return visitCount;
}
