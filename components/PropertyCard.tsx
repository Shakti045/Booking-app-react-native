import { Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const PropertyCard = ({ item }: { item: any }) => {
  return (
    <ScrollView style={{ elevation:15, backgroundColor: "white" }}>
      <View style={{ margin: 10, flexDirection: "row", gap: 10 }}>
        <Image
          source={item.image ? item.image : item.photos[0].image}
          style={{ height: 240, width: "40%", borderRadius: 20 }}
        />
        <View style={{ width: "60%", justifyContent: "space-around" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <FontAwesome name="star" size={24} color="#003580" />
            <Text>{item.rating}</Text>
          </View>
          <Text style={{ width: 200 }}>{item?.address}</Text>
          <Text>{item.rooms?.length} rooms</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <FontAwesome5 name="rupee-sign" size={22} color="black" />
            <Text style={{ fontSize: 25, color: "#003580" }}>
              {item.newPrice}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyCard;
