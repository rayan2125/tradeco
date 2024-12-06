import * as React from 'react';
import { View, Text, useWindowDimensions, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'; // Import TabBar for customization
import Header from '../components/header';
import { callAxiosGet } from '../services/api';
import { API_CONSTANTS } from '../constants/ApiCollection';
import { COLORS } from '../constants/theme';
import { Divider, Icon } from 'react-native-paper';
import TeamsComponent from '../components/Teams/teams';
import { useSelector } from 'react-redux';

const FirstRoute = ({ data }) => (
    <>
        <ScrollView>

            <View style={{ flex: 1 }}>
                {data.length > 0 ? data.map((item, index) => (
                    <TeamsComponent
                        item={item}
                        key={index}
                    />

                )) : <Text>No Active Teams</Text>}
            </View>
        </ScrollView>

    </>

);

const SecondRoute = ({ data }) => (
    <ScrollView>

        <View style={{ flex: 1 }}>
            {data.length > 0 ? data.map((item, index) => (
                <TeamsComponent item={item}
                    key={index}
                />
            )) : <Text>No Pending Teams</Text>}
        </View>
    </ScrollView>
);

const ThirdRoute = ({ data }) => (
    <ScrollView>

        <View style={{ flex: 1 }}>
            {data.length > 0 ? data.map((item, index) => (
                <TeamsComponent item={item}
                    key={index}
                />
            )) : <Text>No Total Teams</Text>}
        </View>
    </ScrollView>
);

export default function Teams() {
    const layout = useWindowDimensions();
    let userDetails = useSelector(state => state.auth.adduser)

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Active' },
        { key: 'second', title: 'Pending' },
        { key: 'third', title: 'Total' },
    ]);

    const [activeTeams, setActiveTeams] = React.useState([]);
    const [pendingTeams, setPendingTeams] = React.useState([]);
    const [totalTeams, setTotalTeams] = React.useState([]);

    React.useEffect(() => {
        teamsData();
    }, []);

    const teamsData = async () => {
        await callAxiosGet(`${API_CONSTANTS.teams}?parentId${userDetails.parentId}?teamUsers${'all'}`).then((res) => {
            const data = res.data.data;

            const active = data.filter(team => team.status === 'active');
            const pending = data.filter(team => team.status === 'pending');
            const total = data;
            setActiveTeams(active);
            setPendingTeams(pending);
            setTotalTeams(total);
        }).catch(err => {
            
        });
    };

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <FirstRoute data={activeTeams} />;
            case 'second':
                return <SecondRoute data={pendingTeams} />;
            case 'third':
                return <ThirdRoute data={totalTeams} />;
            default:
                return null;
        }
    };

    // Custom TabBar to change header color
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.primary }} // Change indicator color
            style={{ backgroundColor: COLORS.secondry }} // Change TabView header color
            labelStyle={{ color: COLORS.white }} // Change text color
        />
    );

    return (
        <>
            <Header title=" My Teams" />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar} // Use custom TabBar
            />
        </>
    );
}
