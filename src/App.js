import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Switch from 'material-ui/Toggle';
import './App.css';

function ToggleOn({ on, children }) {
  return on ? children : null;
}

function ToggleOff({ on, children }) {
  return on ? null : children;
}

function ToggleButton({ on, toggle, ...props }) {
  return <Switch toggled={on} onClick={toggle} {...props} />;
}

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;

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
    const children = React.Children.map(
      this.props.children,
      child => 
        React.cloneElement(child, {
          on: this.state.on,
          toggle: this.toggle
        })
    );

    return <div>{children}</div>;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Toggle onToggle={on => console.log("toggle", on)}>
          <Toggle.On>The button is on</Toggle.On>
          <Toggle.Button />
          <Toggle.Off>The button is off</Toggle.Off>
        </Toggle>
      </MuiThemeProvider>
    )
  }
}

export default App;
