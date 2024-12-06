import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from "native-base"
import { COLORS } from '../../constants/theme'

const TeamSkeleton = () => {
    return (
        <View style={{ marginTop: 10, gap: 15, marginVertical: 5, marginHorizontal: 4 }}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ position: "absolute", left: 20, zIndex: 9, top: 10, }}>

                    <Skeleton
                        rounded="xl"
                        h={20}
                        w={340}
                        background="#CEEBA2"
                    />
                </View>
                <Skeleton
                    rounded="xl"
                    h={200}
                    width={380}

                    background={COLORS.grey}
                >
                </Skeleton>
            </View>

            <View style={{ position: 'absolute', left: 20, bottom: 70 }}>

                <Skeleton
                    h={5}
                    w={340}
                    rounded="sm"
                    background="#E1D5AD"
                />
            </View>
            <View style={{ position: 'absolute', left: 20, bottom: 40 }}>

                <Skeleton
                    h={5}
                    w={340}
                    rounded="sm"
                    background="#E1D5AD"
                />
            </View>
            <View style={{ position: 'absolute', left: 20, bottom: 10 }}>

                <Skeleton
                    h={5}
                    w={340}
                    rounded="sm"
                    background="#E1D5AD"
                />
            </View>

        </View>

    )
}

export default TeamSkeleton

const styles = StyleSheet.create({})