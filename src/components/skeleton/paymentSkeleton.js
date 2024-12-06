import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from "native-base"
import { COLORS } from '../../constants/theme'

const PaymentSkelton = () => {
    return (
        <View style={{flex:1, marginTop: 10, gap: 15, marginVertical: 5, marginHorizontal: 4,alignItems:'center',justifyContent:'center' }}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ position: "absolute", left: 20, zIndex: 9, top: 10, }}>

                    <Skeleton
                        rounded="xl"
                        h={20}
                        w={260}
                        background="#CEEBA2"
                    />
                </View>
                <Skeleton
                    rounded="xl"
                    h={200}
                    width={300}

                    background={COLORS.grey}
                >
                </Skeleton>
                <View style={{ position: 'absolute', left: 20, bottom: 70 }}>

                <Skeleton
                    h={5}
                    w={140}
                    rounded="sm"
                    background="#E1D5AD"
                />
                <View style={{ position: 'absolute',  }}>

                <Skeleton
                    h={5}
                    w={260}
                    rounded="sm"
                    background="#E1D5AD"
                />
            
            </View>
                <View style={{ position: 'absolute',  }}>

                <Skeleton
                    h={5}
                    w={260}
                    rounded="sm"
                    background="#E1D5AD"
                />
            
            </View>
                <View style={{ position: 'absolute', top:40 }}>

                <Skeleton
                    h={5}
                    w={260}
                    rounded="sm"
                    background="#E1D5AD"
                />
            
            </View>
            </View>
            </View>

            
            

        </View>

    )
}

export default PaymentSkelton

const styles = StyleSheet.create({})