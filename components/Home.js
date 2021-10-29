import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Spacer } from './Spacer.js';



const calculationList = [
    {id: '1', name: "Hire Purchase and Lease calculations"},
    {id: '2', name: "hypothertical Additional item lorem ipsum ipsum da lorum ma lorums"},
    // {id: '3', name: "hypothertical Additional item"},
    // {id: '4', name: "hypothertical Additional item"},
    // {id: '5', name: "hypothertical Additional item"},
    // {id: '6', name: "hypothertical Additional item"},
    // {id: '7', name: "hypothertical Additional item"},
    // {id: '8', name: "hypothertical Additional item"},
    // {id: '9', name: "hypothertical Additional item"},
    // {id: '10', name: "hypothertical Additional item"},
    // {id: '11', name: "hypothertical Additional item"},
    // {id: '12', name: "hypothertical Additional item"},
]


export function Home(props) {
    const navigation = useNavigation()



    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={HomeStyles.itemCont}>
                <Text style={HomeStyles.itemText}> {item.name} </Text>
            </TouchableOpacity>
        )
    }


    return (
        <View style={HomeStyles.container}>
            <Spacer height={50} />
            <FlatList 
                data={calculationList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View> 
    );

}

const HomeStyles = StyleSheet.create({
  container: {
    flex:1,
    // display:'flex',
    backgroundColor: '#ffffff',
    minHeight: 200,
  },

  itemCont: {
    backgroundColor: "#e8e8e8",
    paddingVertical: 25,
    marginVertical: 10,
    marginLeft: '10%',
    marginRight: '10%',
  },

  itemText:{
    paddingLeft: 20,
    paddingRight: 20,
  },

  spacer:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
  },

  rr:{
     backgroundColor: 'red'
  },



});