import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Switch from 'material-ui/Toggle';
import './App.css';

class Toggle extends Component {
  static defaultProps = {
    onToggle: () => {}
  }

  state = {
    on: false
  }

  toggle = () => this.setState(({ on }) => ({ on: !on }), () => {
    this.props.onToggle(this.state.on);
  }); 

  render() {
    const { on } = this.state;

    return (
      <Switch 
        toggled={on} 
        onClick={this.toggle} 
      />
    );
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Toggle onToggle={on => console.log("toggle", on)}  />
      </MuiThemeProvider>
    )
  }
}

export default App;
