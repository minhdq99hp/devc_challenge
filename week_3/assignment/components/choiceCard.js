import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';


class choiceCard extends React.Component {
    constructor(props){
        super();
        const { choice: {name} } = props;
    }

    getTitle = (name) => {
        return name && name.charAt(0).toUpperCase() + name.slice(1);
    }

    render(){
      return(
        <View style={styles.choiceContainer}>
          <Text style={styles.choiceDescription}>{this.props.player}</Text>
          <Image source={this.props.choice.uri} resizeMode="contain" style={styles.choiceImage} />
          <Text style={styles.choiceCardTitle}>{this.getTitle(this.props.choice.name)}</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    choiceContainer: {
      flex: 1,
      alignItems: 'center',
    },
    choiceDescription: {
      fontSize: 25,
      color: '#250902',
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    choiceCardTitle: {
      fontSize: 30,
      color: '#250902'
    },
    choiceImage: {
      width: 150,
      height: 150,
      padding: 10,
    }
  });

  export default choiceCard;