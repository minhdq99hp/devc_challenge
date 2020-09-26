import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView } from 'react-native';

import ChoiceCard from './components/choiceCard';

const CHOICES = [
  {
    name: 'rock',
    uri: require('./media/rock.png')
  },
  {
    name: 'paper',
    uri: require('./media/paper.jpg')
  },
  {
    name: 'scissors',
    uri: require('./media/scissors.jpg')
  }
];

const DEFAULT_CHOICE = {
  name: '',
  uri: null,
}


export default class App extends React.Component {
  constructor(props){
    super();

    this.state = {
      gamePrompt: 'Fire!',
      userChoice: DEFAULT_CHOICE,
      computerChoice: DEFAULT_CHOICE,
    }
  }

  randomComputerChoice = () => CHOICES[Math.floor(Math.random() * CHOICES.length)];

  getRoundOutcome = userChoice => {
    const computerChoice = this.randomComputerChoice().name;
    let result;
  
    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }
  
    if (userChoice === computerChoice) result = 'Tie game!';
    console.log('result', result);
    return [result, computerChoice];
  };

  setGamePrompt = (result) => this.setState({gamePrompt: result});

  onPress = playerChoice => {
    let [result, compChoice] = this.getRoundOutcome(playerChoice.name);
  
    const newUserChoice = playerChoice;
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);
  
    this.setGamePrompt(result);
    this.setState({
      userChoice: newUserChoice,
      computerChoice: newComputerChoice
    })
  };

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <Text>{this.state.gamePrompt}</Text>
        <View style={styles.choicesContainer}>
          <ChoiceCard player="Player" choice={this.state.userChoice}/>
          <Text style={{ color: '#250902' }}>vs</Text>
          <ChoiceCard player="Computer" choice={this.state.computerChoice} />
        </View>

        {
          CHOICES.map(choice => {
            return <TouchableOpacity key={choice.name} title={choice.name} onPress={() => this.onPress(choice)} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>
              {choice.name}
              </Text>
            </TouchableOpacity>;
          })
        }
      </SafeAreaView>
      
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 50,
    shadowRadius: 5,
    paddingBottom: 50,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
});