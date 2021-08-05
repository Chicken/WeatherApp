import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    },
    value: {
        flex: 1,
        color: "#eeeeee",
        fontSize: 20,
        marginLeft: 5
    },
    entry: {
        flex: 1,
        marginBottom: 5,
        color: "#cccccc",
        fontSize: 20
    }
});

const Row = ({ value, unit, label }) => (
    <View style={styles.row}>
        <Text style={styles.entry}>{label}</Text>
        <Text style={styles.value}>
            {value} {unit}
        </Text>
    </View>
);

export default Row;
