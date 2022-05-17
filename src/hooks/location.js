import { useEffect, useState, useRef } from "react";

import * as Location from "expo-location";

export function useCurrentLocation() {
    async function getLocation() {
        let location = await Location.getCurrentPositionAsync({});
        return ({ latitude, longitude } = location.coords);
    }

    return { getLocation };
}

export function useWatchPosition() {
    const [position, setPosition] = useState(null);
    const locationRef = useRef(null);

    function startLocationWatch() {
        Location.watchPositionAsync(
            {
                timeInterval: 2000,
                distanceInterval: 5,
            },
            (data) => {
                const { latitude, longitude } = data?.coords;

                if (latitude && longitude) {
                    setPosition({
                        latitude,
                        longitude,
                    });
                }
            }
        ).then((remove) => (locationRef.current = remove));
    }

    function stopLocationWatch() {
        if (position && locationRef && locationRef.current) {
            locationRef.current.remove();
        }
    }

    return {
        position,
        startLocationWatch,
        stopLocationWatch,
    };
}

export function useLocation() {
    const { getLocation } = useCurrentLocation();
    const [hasPermission, setHasPermission] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPermLocation();
    }, []);

    const getPermLocation = async () => {
        if (!hasPermission) {
            const getPermission = await Location.requestForegroundPermissionsAsync();
            const { status } = getPermission;

            if (status !== "granted") return;

            setHasPermission(true);
            setLoading(false);
        }
    };

    const getCoords = async () => {
        if (loading) return;
        let location = await getLocation();
        return ({ latitude, longitude } = location);
    };

    const getAddress = async () => {
        if (loading) return;
        let { latitude, longitude } = await getCoords();
        let address = await Location.reverseGeocodeAsync({ latitude, longitude });
        return {
            address: address[0] || "",
            latitude,
            longitude,
        };
    };

    return {
        loading,
        hasPermission,
        getCoords,
        getAddress,
    };
}
