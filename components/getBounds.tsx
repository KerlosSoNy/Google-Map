import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import { fetchLocationName } from '../functions/fetchLocationName';

interface Props {
    setCurrentBoundaries?: (boundaries: any) => void;
    setPositions?: (positions: any) => void;
    positions?: any[];
    multi?: boolean;
    setAddAnotherPoint?: (status: boolean) => void;
    addStatus?: boolean;
}

const MapEventsHandler = ({ multi = true, setCurrentBoundaries, setPositions, positions = [], setAddAnotherPoint, addStatus }: Props) => {
    const map = useMap();
    useEffect(() => {
        if (!map) return;

        const handleMoveEnd = () => {
            const bounds = map.getBounds();
            if (bounds) {
                setCurrentBoundaries && setCurrentBoundaries({
                    _southWest: [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()],
                    _northEast: [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()],
                });
            }
        };

        const handleDoubleClick = async (e: any) => {
            if (!addStatus) {
                const locationName = await fetchLocationName(e.latLng.lat(), e.latLng.lng());
                if (multi) {
                    setPositions && setPositions([...positions, { title: locationName, lat: e.latLng.lat(), lng: e.latLng.lng() }]);
                    setAddAnotherPoint && setAddAnotherPoint(true);
                } else {
                    setPositions && setPositions({ title: locationName, lat: e.latLng.lat(), lng: e.latLng.lng() });
                }
            } else {
                alert('Please add Point First');
            }
        };

        map.addListener('bounds_changed', handleMoveEnd);
        map.addListener('dragend', handleMoveEnd);
        map.addListener('dblclick', handleDoubleClick);

        // Cleanup event listeners on component unmount
        return () => {
            google.maps.event.clearListeners(map, 'bounds_changed');
            google.maps.event.clearListeners(map, 'dragend');
            google.maps.event.clearListeners(map, 'dblclick');
        };
    }, [map, addStatus, multi, positions, setCurrentBoundaries, setPositions, setAddAnotherPoint]);

    return null;
};

export default MapEventsHandler;
