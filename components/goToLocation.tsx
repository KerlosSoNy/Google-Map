import { useMap } from '@vis.gl/react-google-maps';
import React, { useEffect } from 'react';

interface Props {
    place: google.maps.places.PlaceResult | any;
    open: boolean;
}

const GoToLcation = ({ place, open }: Props) => {
    const map: any = useMap();
    useEffect(() => {
        if (place) {
            map.setCenter(place)
        }
    }, [open]);

    return null;
};

export default React.memo(GoToLcation);