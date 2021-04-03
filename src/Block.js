import React from "react";
import { StyleSheet, FlatList } from "react-native";
import Row from "./Row";

class Block extends React.Component {
    renderItem({ item }) {
        return <Row label={item.label} value={item.value} unit={item.unit} />;
    }
    render() {
        return (
            <FlatList
                style={styles.block}
                data={this.props.rows.map((row) => {
                    return {
                        id: row,
                        value: this.props.weather[row],
                        label: this.props.legend[row].label,
                        unit: this.props.legend[row].unit
                    };
                })}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
            />
        );
    }
}

const styles = StyleSheet.create({
    block: {
        margin: 10
    }
});

export default Block;
