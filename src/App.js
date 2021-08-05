import React, { useEffect, useState, BackHandler } from "react";
import { FlatList, StyleSheet, Text, StatusBar } from "react-native";
import Block from "./Block";

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

const App = () => {
    const [meta, setMeta] = useState({
        layout: [],
        legend: {}
    });
    const [weather, setWeather] = useState({});

    const updateWeather = async () => {
        try {
            setWeather(
                await (
                    await fetch("https://weather.antti.codes/api/weather")
                ).json()
            );
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        Promise.all([
            fetch("https://weather.antti.codes/api/mobile"),
            fetch("https://weather.antti.codes/api/weather")
        ])
            .then(([rawMeta, rawWeather]) => {
                rawMeta.json().then((parsed) => setMeta(parsed));
                rawWeather.json().then((parsed) => setWeather(parsed));
            })
            .catch((e) => {
                console.error(e);
                BackHandler.exitApp();
            });
        const updateInterval = setInterval(updateWeather, 10000);
        return () => clearInterval(updateInterval);
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-light" />
            <FlatList
                style={styles.view}
                ListHeaderComponent={
                    <Text style={styles.header}>Koti - Sää</Text>
                }
                data={meta.layout}
                renderItem={({ item: block }) => (
                    <Block
                        rows={block}
                        legend={meta.legend}
                        weather={weather}
                    />
                )}
                keyExtractor={(item) => item.join("")}
            />
        </>
    );
};

export default App;
