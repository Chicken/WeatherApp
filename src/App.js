import React from "react";
import { FlatList, StyleSheet, Text, StatusBar } from "react-native";
import Block from "./Block";

class App extends React.Component {
    state = {
        meta: {
            layout: [],
            legend: {}
        },
        weather: {}
    };

    async updateWeather() {
        try {
            let res = await fetch("https://weather.antti.codes/api/weather");
            this.setState({
                meta: this.state.meta,
                weather: await res.json()
            });
        } catch (e) {
            // ignore
        }
    }

    componentDidMount() {
        fetch("https://weather.antti.codes/api/mobile")
            .then((res) => res.json())
            .then((meta) => {
                this.setState({
                    meta,
                    weather: this.state.weather
                });
            });
        this.updateWeather();
        this.updateInterval = setInterval(this.updateWeather, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    renderItem = ({ item: block }) => {
        return (
            <Block
                rows={block}
                legend={this.state.meta.legend}
                weather={this.state.weather}
            />
        );
    };

    render() {
        return (
            <>
                <StatusBar barStyle="dark-light" />
                <FlatList
                    style={styles.view}
                    ListHeaderComponent={
                        <Text style={styles.header}>Koti - Sää</Text>
                    }
                    data={this.state.meta.layout}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.join("")}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
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
