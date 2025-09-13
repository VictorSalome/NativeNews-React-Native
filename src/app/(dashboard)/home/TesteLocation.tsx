import * as Location from "expo-location";
import { useEffect, useState } from "react";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
}

const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      // Solicita permissão
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada");
        setLoading(false);
        return;
      }

      // Obtém a localização atual
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy,
      });
    } catch (error) {
      setErrorMsg("Erro ao obter localização");
    } finally {
      setLoading(false);
    }
  };

  return { location, errorMsg, loading, getCurrentLocation };
};

export default useLocation;
