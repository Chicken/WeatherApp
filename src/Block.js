import React from "react";
import { StyleSheet, FlatList } from "react-native";
import Row from "./Row";

const styles = StyleSheet.create({
    block: {
        margin: 10
    }
});

const Block = ({ rows, weather, legend }) => (
    <FlatList
        style={styles.block}
        data={rows.map((row) => ({
            id: row,
            value: weather[row],
            label: legend[row].label,
            unit: legend[row].unit
        }))}
        renderItem={({ item }) => (
            <Row label={item.label} value={item.value} unit={item.unit} />
        )}
        keyExtractor={(item) => item.id}
    />
);

export default Block;
