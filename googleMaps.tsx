import { APIProvider, ControlPosition, Map, Marker } from '@vis.gl/react-google-maps';
import { useMap } from './hooks/useMap';
import MapHandler from './components/mapHandler';
import { CustomMapControl } from './components/mapControl';
import GoToLocation from './components/goToLocation';
import { FaLocationDot } from "react-icons/fa6";
import MapEventsHandler from './components/getBounds';

export default function GoogleMaps({ setSelected, addStatus, setAddAnotherPoint, setCurrentBoundaries, data, width = 'screen', isMulti = false, setIndex }: any) {
    const {
        currentPosition,
        open, setOpen,
        setSelectedPlace,
        selectedPlace
    } = useMap();


    return (
        <APIProvider apiKey={'API-Key'}>
            <div className='relative w-fit'>
                <button type='button' title="Get Current Location" onClick={() => setOpen(!open)} className='absolute bottom-8 bg-white rounded-full px-2 py-1.5 z-30 left-2'>
                    <FaLocationDot className='text-3xl text-red-500' />
                </button>
                <Map
                    className={`w-${width} h-full`}
                    defaultCenter={currentPosition || { lat: 30.7128, lng: 30.0060 }} // Default to New York if location is not available
                    defaultZoom={10}
                    maxZoom={17}
                    minZoom={13}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                >
                    {/* Search Control */}
                    <CustomMapControl
                        controlPosition={ControlPosition.TOP}
                        onPlaceSelect={setSelectedPlace}
                    />
                    {/* Current Position */}
                    {currentPosition && (
                        <Marker position={currentPosition} />
                    )}
                    {/* Selected Marker */}
                    {data?.lat && (
                        <Marker position={{ lat: data.lat, lng: data.lng }} />
                    )}
                    {/* If There is Multi Positions */}
                    {
                        isMulti &&
                        data?.length > 0 &&
                        data.map((d: any, i: number) => (
                            <Marker
                                onClick={() => setIndex(i)}
                                key={i} position={{ lat: d.lat, lng: d.lng }} />
                        ))
                    }
                    {/* To Make My Function As i Want */}
                    <MapEventsHandler
                        setAddAnotherPoint={setAddAnotherPoint}
                        addStatus={addStatus}
                        setCurrentBoundaries={setCurrentBoundaries}
                        multi={isMulti}
                        setPositions={setSelected}
                    />
                    {/* Back To Location */}
                    <GoToLocation place={currentPosition} open={open} />
                    {/* To Get Search Location */}
                    <MapHandler place={selectedPlace} />
                </Map>
            </div>
        </APIProvider>

    )
}
