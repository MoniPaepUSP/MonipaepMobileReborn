import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Accordion } from "./Accordion";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../styles/colors";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { List } from "react-native-paper";
import { getAddressFromCoordinates } from "../handlers/maps.handler";

interface Points {
  latitude: number;
  longitude: number;
}

interface RegionPoints {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

enum UnitType {
  UBS = "UBS",
  HOSPITAL = "HOSPITAL",
  POSTO_SAUDE = "POSTO SAUDE",
}

interface HealthLocation {
  name: string;
  coords: Points;
  type: UnitType;
}

const healthLocations: HealthLocation[] = [
  {
    type: UnitType.HOSPITAL,
    coords: {
      latitude: -22.0172,
      longitude: -47.8867,
    },
    name: "Hospital Unimed",
  },
  {
    type: UnitType.UBS,
    coords: {
      latitude: -22.0145,
      longitude: -47.8933,
    },
    name: "UBS Central",
  },
  {
    type: UnitType.HOSPITAL,
    coords: {
      latitude: -22.0211,
      longitude: -47.8803,
    },
    name: "Hospital São Carlos",
  },
  {
    type: UnitType.UBS,
    coords: {
      latitude: -22.0388,
      longitude: -47.8592,
    },
    name: "UBS Vila Isabel",
  },
  {
    type: UnitType.HOSPITAL,
    coords: {
      latitude: -22.0244,
      longitude: -47.8832,
    },
    name: "Hospital Nossa Senhora Aparecida",
  },
  {
    type: UnitType.UBS,
    coords: {
      latitude: -22.0467,
      longitude: -47.8511,
    },
    name: "UBS Santa Felícia",
  },
];

export default function CloseByUnitsComponent(): JSX.Element {
  const [isFullList, setIsFullList] = useState(false);
  const [isFullMap, setIsFullMap] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [addressFromCoordinates, setAddressFromCoordinates] = useState({});

  const mapRef = React.createRef<MapView>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permssão para acessar localização negada");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let locationContent = "Waiting..";
  if (errorMsg) {
    locationContent = errorMsg;
  }

  if (location) {
    locationContent = JSON.stringify(location);
  }

  const toggleList = (): void => {
    setIsFullList(!isFullList);
    setIsFullMap(false);
  };

  const toggleMap = (): void => {
    setIsFullMap(!isFullMap);
    setIsFullList(false);
  };

  const handleRegionChange = (coords: Points) => {
    setRegion(
      getRegionForCoordinates([
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      ])
    );
  };

  function formatHospitalAddress(hospital): string {
    return `${hospital.address}, ${hospital.addressNumber} - ${hospital.neighbourhood}, ${hospital.city} - ${hospital.state}, ${hospital.cep}`;
  }

  /* 
  Given an array of coordinates coords this function returns the region (lat, lng and deltas) to contain those coordinates.
  Source: https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-243423775
  Docs: https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
  */
  function getRegionForCoordinates(points: Points[]): RegionPoints {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;

    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = maxX - minX;
    const deltaY = maxY - minY;
    /*
  A better explanation of the concept of Lat and Long Delta can be found here
  https://stackoverflow.com/questions/36685372/how-to-zoom-in-out-in-react-native-map/36688156#36688156
  */
    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
    };
  }

  // Fórmula de Haversine
  function getDistanceBetweenTwoPoints(
    coords1: Points,
    coords2: Points
  ): string {
    const R = 6371; // Raio da Terra em quilômetros
    const lat1 = (coords1.latitude * Math.PI) / 180;
    const lon1 = (coords1.longitude * Math.PI) / 180;
    const lat2 = (coords2.latitude * Math.PI) / 180;
    const lon2 = (coords2.longitude * Math.PI) / 180;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(2);
  }

  const floatingButtonStyle = isFullMap
    ? styles.openListFloatingButton
    : styles.closeListFloatingButton;

  // Initial value is the area with all the locations provided by the API
  const [region, setRegion] = useState<RegionPoints>(
    getRegionForCoordinates(
      healthLocations.map((location) => ({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }))
    )
  );

useEffect(() => {
  const fetchAddresses = async () => {
    const addresses = {};
    for (const location of healthLocations) {
      const address = await getAddressFromCoordinates(location.coords);
      addresses[location.name] = address;
    }
    setAddressFromCoordinates(addresses);
  };
  fetchAddresses();
}, []);

  useEffect(() => {
    if (region) {
      // latitudeDelta and longitudeDelta represents in this case the zoom size
      mapRef.current.animateToRegion(
        { ...region, latitudeDelta: 0.02, longitudeDelta: 0.02 },
        500
      );
    }
  }, [region]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.mapContainer,
          isFullList && styles.hidden,
          isFullMap && styles.fullScreen,
        ]}
      >
        <MapView
          ref={mapRef}
          initialRegion={region}
          style={styles.map}
          showsUserLocation={true}
        >
          {healthLocations.map((location, index): JSX.Element => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={location.name}
              />
            );
          })}
        </MapView>
        <TouchableOpacity style={floatingButtonStyle} onPress={toggleMap}>
          <AntDesign name={isFullMap ? "up" : "down"} size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.listContainer,
          isFullMap && styles.hidden,
          isFullList && styles.fullScreen,
        ]}
      >
        <ScrollView contentContainerStyle={styles.list}>
          {healthLocations.map((locations, index): JSX.Element => {
            const { name, coords, type } = locations;
            return (
              <View style={styles.card} key={index}>
                <TouchableOpacity onPress={() => handleRegionChange(coords)}>
                  <Text style={styles.cardTitle}>{name}</Text>
                  <Text style={styles.cardText}>Tipo: {type}</Text>
                  <Text style={styles.cardText}>
                    Endereço: {addressFromCoordinates[name]}
                  </Text>
                  <Text style={[styles.cardText, styles.distance]}>
                    {location
                      ? getDistanceBetweenTwoPoints(
                          {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                          },
                          {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                          }
                        )
                      : "Calculando distância..."}{" "}
                    KM
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={toggleList}>
            <Text style={styles.buttonText}>
              {isFullList ? "Voltar ao mapa" : "Ver lista completa"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    maxHeight: 800,
    width: "100%",
  },
  card: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: Dimensions.get("window").width * 0.9,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    color: "gray",
  },
  distance: {
    color: colors.blue_dark2,
    fontWeight: "500",
  },
  mapContainer: {
    flex: 0.5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  listContainer: {
    flex: 0.7,
    backgroundColor: colors.gray_light3,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    padding: 20,
    gap: 15,
  },
  hidden: {
    display: "none",
  },
  fullScreen: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  openListFloatingButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: colors.blue,
    padding: 12,
    borderRadius: 30,
  },
  closeListFloatingButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 30,
  },
});