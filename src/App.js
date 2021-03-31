import React from "react";
import { ScrollView, StyleSheet, Text, StatusBar } from "react-native";
import config from "./config.js";

class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async updateWeather() {
        try {
            let res = await fetch("https://weather.antti.codes/api/weather");
            this.setState(await res.json());
        } catch (e) {
            // ignore
        }
    }

    componentDidMount() {
        this.updateWeather();
        this.updateInterval = setInterval(this.updateWeather, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    renderItem(item) {
        return (
            <Text style={styles.entry} key={item.key}>
                {(config.legend[item.key]?.label ?? item.key) + ": "}
                <Text style={styles.value}>
                    {item.val}
                    {config.legend[item.key]?.unit ?? ""}
                </Text>
            </Text>
        );
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-light" />
                <ScrollView style={styles.view}>
                    <Text style={styles.header}>Koti - Sää</Text>
                    {Object.entries(this.state)
                        .map(([key, val]) => ({ key, val }))
                        .filter((item) => !config.disabled.includes(item.key))
                        .map((item) => this.renderItem(item))}
                    <Text>{"\n\n\n"}</Text>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    value: {
        color: "#eeeeee"
    },
    entry: {
        marginBottom: 5,
        color: "#cccccc",
        fontSize: 20
    },
    view: {
        backgroundColor: "#444444",
        height: "100%",
        padding: "2%"
    },
    header: {
        textAlign: "center",
        marginBottom: 10,
        color: "#ffffff",
        fontSize: 50
    }
});

export default App;
