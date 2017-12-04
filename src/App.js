import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Switch from 'material-ui/Toggle';
import './App.css';

const TOGGLE_CONTEXT = "__toggle__";

function ToggleOn({ children }, context) {
  const { on } = context[TOGGLE_CONTEXT];
  return on ? children : null;
}

ToggleOn.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
}

function ToggleOff({ children }, context) {
  const { on } = context[TOGGLE_CONTEXT];
  return on ? null : children;
}

ToggleOff.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

function ToggleButton(props, context) {
  const { on, toggle } = context[TOGGLE_CONTEXT];
  return <Switch toggled={on} onClick={toggle} {...props} />;
}

ToggleButton.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = {
    onToggle: () => {}
  }

  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };

  state = {
    on: false
  }

  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.toggle
      }
    }
  }

  toggle = () => {
    this.setState(({ on }) => ({ on: !on }), () => {
      this.props.onToggle(this.state.on);
    });
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Toggle onToggle={on => console.log("toggle", on)}>
          <Toggle.On>The button is on</Toggle.On>
          <div>
            <Toggle.Button />
          </div>
          <Toggle.Off>The button is off</Toggle.Off>
        </Toggle>
      </MuiThemeProvider>
    )
  }
}

export default App;
