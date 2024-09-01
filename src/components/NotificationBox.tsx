import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../styles/colors";

interface NotificationBoxProps {
  title?: string;
  description?: string;
  wasRead?: boolean;
  date?: string | Date
}

export function NotificationBox({
  title,
  description,
  wasRead,
  date
}: NotificationBoxProps) {
  return (
    <View style={[styles.container, !wasRead && styles.unreadContainer]}>
      <TouchableOpacity style={styles.columnRow}>
        <View style={styles.textColumn}>
          <Text style={styles.title}>{title || "Notificação"}</Text>
          <Text numberOfLines={3} ellipsizeMode="tail">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
            fugiat ratione voluptas debitis voluptatum explicabo aperiam ex?
            Unde, nemo rem!
          </Text>
          <Text style={{ textAlignVertical: "center" }}>
            21/01/2006 14:56:12
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.green,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    backgroundColor: colors.white,
    padding: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  unreadContainer: {
    borderColor: colors.green,
    borderWidth: 1,
  },
  columnRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  textColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
});
