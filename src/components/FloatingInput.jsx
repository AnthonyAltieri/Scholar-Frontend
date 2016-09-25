/**
 * @author Anthony Altieri on 9/5/16.
 */

import React, { Component } from 'react';

const passwordMask = (password) => {
  if (password.length === 0) return;
  return password
    .split('')
    .reduce((p, c, i , a) => (i !== a.length - 1 ? p + '*' : p + c), '')
};

const backspaceMask = (password) => {
  if (password.length === 0) return;
  const mask = password
    .split('')
    .reduce((p, c, i, a) => (i !== a.length - 1 ? p + '*' : p + c), '')
  return mask;
};


const isValidPasswordCharacter = (character) => {
  const char = '' + character;
  const VALID_PASSWORD_SYMBOLS = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '!', '@', '#', '$', '%', '^', '&', '*', '(',
    ')', '-', '=', '_', '+', '[', ']', '\\', '{', '}', '|', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', ',', '.', '/', '<', '>', '?', ';', '\'',
    ':', '"', '`', '~', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ];
  return !!VALID_PASSWORD_SYMBOLS.filter((s) => s === char)[0];
};

class FloatingInput extends Component {
  componentDidMount() {
    this.value = '';
    this.display = '';
    this.type = this.props.type;
  }

  onKeyDown(e, type) {
    switch (type) {
      default:
      case 'text': {
        return
      }
      case 'password': {
        // if (isValidPasswordCharacter(e.key)) {
        //   this.value += e.key;
        //   const maskedValue = passwordMask(this.value);
        //   e.target.value = maskedValue;
        // }
      }
    }
  }

  onKeyUp(e, type) {
    console.log('e.key', e.key);
    switch (type) {
      default:
      case 'text': {
        return
      }

      case 'password': {
        if (e.key === 'Backspace') {
          if (e.target.value.length === 0) {
            this.value = '';
            return;
          }
          this.value = this.value.slice(0, e.target.value.length);
          e.target.value = passwordMask(this.value);
          return;
        }

        if (isValidPasswordCharacter(e.key)) {
          console.log('e.target.value', e.target.value);
          console.log('this.value', this.value);
          this.value += e.target.value
            .slice(this.value.length, e.target.value.length);
          console.log('sliced target value', this.value);
          e.target.value = passwordMask(this.value);
        }
      }
    }
  }

  render() {
    const props = this.props;
    const {
      name, error, valid, type, children
    } = props;

    let highlightClass = 'highlight';
    if (error) {
      highlightClass += ' error';
    }
    if (valid) {
      highlightClass += ' valid';
    }

    let input;

    return (
      <div className="container-floating-input">
        <input
          name={name}
          type="text"
          value={this.display}
          ref={(n) => { this.input = n }}
          onKeyDown={(e) => this.onKeyDown(e, type)}
          onKeyUp={(e) => this.onKeyUp(e, type)}
          required
        />
        <label
          htmlFor={name}
          onClick={(e) => { this.input.focus() }}
        >
          {children}
        </label>
        <span className="bar" />
        <span
          className={'highlight background-bright'
          }
        />
      </div>
    );
  }
};

export default FloatingInput;