import { useEffect, useState } from "react";

export function useMap() {
    const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | any>(null);
    const [open, setOpen] = useState(false)
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | any>(null);


    useEffect(() => {
        // Check if the browser supports Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location: ", error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return {
        currentPosition,
        setSelectedPlace, selectedPlace,
        open, setOpen
    }
}