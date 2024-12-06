import { View, Text, FlatList, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/header';
import { callAxiosGet } from '../services/api';
import { API_CONSTANTS } from '../constants/ApiCollection';
import TeamsComponent from '../components/Teams/teams';
import { COLORS } from '../constants/theme';
import TeamSkeleton from '../components/skeleton/teamSkeleton';

const TeamsMember = ({ route }) => {
    const id = route.params.id;
    const [teams, setTeams] = useState(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const teamsData = async () => {
                setLoading(true); // Start loading
                try {
                    const res = await callAxiosGet(`${API_CONSTANTS.teams}?parentId=${id}`);
                    const data = res.data.data;
                    setTeams(data);
                } catch (err) {
                    
                } finally {
                    setLoading(false); // Stop loading
                }
            };

            teamsData();

            // Optional cleanup when screen is unfocused
            return () => setTeams(null);
        }, [id])
    );

    return (
        <>
            <Header title={route.params.name} />

            <View style={{ flex: 1 }}>
                {loading ? (
                    // Show skeleton loader while data is loading
                    <TeamSkeleton />
                ) : teams && teams.length > 0 ? (
                    // Show team data if available
                    <FlatList
                        data={teams}
                        renderItem={({ item }) => <TeamsComponent item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    // Show "No Member" image and message if no data is found
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require("../assets/team.png")} // Update the path to your image file
                            style={{ width: 200, height: 200 }}
                            resizeMode="contain"
                        />
                        <Text style={{ color: COLORS.primary, fontSize: 20, fontWeight: '800' }}>No Member !!!</Text>
                    </View>
                )}
            </View>
        </>
    );
};

export default TeamsMember;
