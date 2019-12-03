import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

var { height, width } = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBanner: [],
            isLoading: true,
            dataCategories: [],
            selectCatg: 0,
            dataFood: []
        }
    }

    componentDidMount(){
        const url = "http://tutofox.com/foodapp/api.json"
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataBanner: responseJson.banner,
                    dataCategories: responseJson.categories,
                    dataFood:responseJson.food
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    _renderItem(item){
        return(
            <TouchableOpacity 
                style={[styles.divCategories, {backgroundColor:item.color}]}
                onPress={() => this.setState({selectCatg: item.id})}
            >
                <Image
                    style={{width: 100, height: 80}}
                    resizeMode="contain"
                    source={{uri: item.image}}
                />
                <Text style={{ fontWeight:'bold', fontSize:22, textAlign: 'center'}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    _renderItemFood(item){
        let catg = this.state.selectCatg
        if(catg==0 || catg==item.categories){
            return(
                <TouchableOpacity style={styles.divFood}>
                    <Image 
                        style={styles.imageFood}
                        resizeMode="contain"
                        source={{uri:item.image}}
                    />
                    <View 
                        style={{ height:((width/2)-20)-90, backgroundColor:'transparent', width:((width/2)-20)-10}}
                    ></View>
                    <Text style={{fontWeight:'bold', fontSize:22, textAlign:'center'}}>
                        {item.name}
                    </Text>
                    <Text>Descp Food and Details</Text>
                    <Text style={{fontSize: 20, color:'green'}}>
                        ${item.price}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        const { dataBanner, dataCategories, selectCatg, dataFood } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.swiper}>
                        <Image resizeMode="contain" style={{height: 60, width: width/2, margin: 10}} source={require('../assets/logo.png')} />
                        <Swiper style={{ height: width/2}} showsButtons={false} autoplay={true} autoplayTimeout={2}>
                            {
                                dataBanner.map((itembann) => {
                                    return(
                                        <Image style={styles.imageBanner} resizeMode="contain" source={{ uri: itembann}} />
                                    )
                                })
                            }
                        </Swiper>
                        <View style={{ height: 20 }} />
                    </View>
                    <View style={styles.categories}>
                        <Text style={styles.titleCatg}>Categories {selectCatg}</Text>
                        <FlatList 
                            horizontal={true}
                            data={dataCategories}
                            renderItem={({item}) => this._renderItem(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <FlatList 
                            // horizontal={true}
                            data={dataFood}
                            numColumns={2}
                            renderItem={({ item }) => this._renderItemFood(item)}
                            keyExtractor={(item, index) => index.toString()}
                        /> 
                        <View style={{height: 20}} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f2f2f2"
    },
    swiper: {
        width: width,
        alignItems: "center"
    },
    imageBanner: {
        height: width/2,
        width: width-40,
        borderRadius: 10,
        marginHorizontal: 20
    },
    categories: {
        width: width,
        borderRadius:20,
        paddingVertical: 20,
        backgroundColor:'white'
    },
    titleCatg: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    divCategories: {
        backgroundColor: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        borderRadius: 10
    },
    divFood: {
        width:(width/2)-20,
        padding:10,
        borderRadius:10,
        marginTop:55,
        marginBottom:5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 50,
        backgroundColor: 'white',
    },
    imageFood: {
        width: ((width/2)-20)-10,
        height: ((width/2)-20)-30,
        backgroundColor: 'transparent',
        position:'absolute',
        top: -45
    }
})