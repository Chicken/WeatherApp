import React from "react";
import { StyleSheet, Text, View } from "react-native";

class Row extends React.Component {
    render() {
        return (
            <View style={styles.row}>
                <Text style={styles.entry}>{this.props.label}</Text>
                <Text style={styles.value}>
                    {this.props.value} {this.props.unit}
                </Text>
            </View>
        );
    }
}

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

export default Row;
