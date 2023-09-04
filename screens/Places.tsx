import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  FlatList,
  Pressable
} from "react-native";
import React, { useState, useMemo } from "react";
import { data } from "../constants/data";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { Button } from "react-native-paper";
import PropertyCard from "../components/PropertyCard";

type PlacesScreeProps = NativeStackScreenProps<RootStackParamList, "Places">;

const Places = ({ navigation, route }: PlacesScreeProps) => {
  const { placeid } = route.params;
  const [properties, setproperties] = useState(
    data.find((place) => place.id === placeid).properties
  );
  const [showfilters, setshowfilters] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Low to high",
        value: "Asc",
      },
      {
        id: "2",
        label: "High to low",
        value: "Desc",
      },
    ],
    []
  );
  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "gray",
            padding: 15,
            elevation: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setshowfilters(true)}
            style={styles.button}
          >
            <MaterialCommunityIcons
              name="sort-variant"
              size={24}
              color="black"
            />
            <Text>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setshowfilters(true)}
            style={styles.button}
          >
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="black"
            />
            <Text>Sort</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const points: Array<{
                longitude: string;
                latitude: string;
                name: string;
              }> = properties.map((property: any) => {
                return {
                  longitude: property.longitude,
                  latitude: property.latitude,
                  name: property.name,
                };
              });
              navigation.navigate("Map", {
                points: points,
              });
            }}
            style={styles.button}
          >
            <FontAwesome name="map-marker" size={24} color="black" />
            <Text>Map</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={properties}
        keyExtractor={(property) => property.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Propertydetails", {
                propertyid: item.id,
                placeid: placeid,
              });
            }}
          >
            <PropertyCard item={item} />
          </Pressable>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showfilters}
        onRequestClose={() => {
          setshowfilters(!showfilters);
        }}
      >
        <View style={styles.bottom_modal}>
          <View style={{ padding: 15, backgroundColor: "gray", elevation: 15 }}>
            <Text style={{ textAlign: "center" }}>Sort & Filters</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              height: "100%",
              padding: 5,
              alignItems: "center",
            }}
          >
            <View>
              <Text>Sort By Price</Text>
            </View>
            <View
              style={{
                height: "90%",
                width: 2,
                borderWidth: 2,
                borderColor: "gray",
                marginVertical: 10,
              }}
            ></View>

            <View>
              <RadioGroup
                containerStyle={{ gap: 25 }}
                radioButtons={radioButtons}
                onPress={(id) => {
                  setSelectedId(id);

                  if (id === "2") {
                    setproperties((properties) => {
                      const sortedproperties = properties.sort(
                        (a, b) => b.newPrice - a.newPrice
                      );
                      return sortedproperties;
                    });
                  } else if (id === "1") {
                    setproperties((properties) => {
                      const sortedproperties = properties.sort(
                        (a, b) => a.newPrice - b.newPrice
                      );
                      return sortedproperties;
                    });
                  }
                }}
                selectedId={selectedId}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Places;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bottom_modal: {
    width: "100%",
    height: 300,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    flex: 1,
  },
});
