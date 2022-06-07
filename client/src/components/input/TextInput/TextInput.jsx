import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './TextInput.scss';
import EyeSolid from '../../../../assets/icons/eye-solid.svg';
import EyeSlash from '../../../../assets/icons/eye-slash-solid.svg';

const TextInput = ({
  label,
  placeholder,
  description,
  isRequiredInput,
  errorFeedback,
  onChange,
  onEnterKey,
  localStorageKey,
  isDisabled,
  inputArgs,
  initialValue,
  hasRestrictedInput,
  inputType,
}) => {
  const [value, setValue] = useState(
    localStorageKey
      ? localStorage.getItem(localStorageKey)
        ? localStorage.getItem(localStorageKey)
        : initialValue
        ? initialValue
        : ''
      : initialValue
      ? initialValue
      : '',
  );
  const [type, setType] = useState(inputType ? inputType : 'text');

  const onKeyPress = (target) => {
    if (target.charCode === 13) {
      if (onEnterKey) onEnterKey(value);
    }
  };

  const onInputChange = (event) => {
    let value = event.target.value;
    if (hasRestrictedInput) {
      value = value.replace(/[^\w\n!@#$%^&*()\-+={}[\]:";'<>,./?~`\\ ]+/g, '');
    }
    onChange ? onChange(value) : 0;
    setValue(value);
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, value);
    }
  };

  return (
    <div className="text-input-container">
      <div className="text-input-title-container">
        {isRequiredInput ? <p className="text-input-required-star">*</p> : <></>}
        {label ? <p className="text-input-title">{label}</p> : <></>}
      </div>
      <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
        {inputType == 'textArea' ? (
          <textarea
            className={
              'text-input text-input-area' +
              (errorFeedback ? ' text-input-error' : '') +
              (isDisabled ? ' text-input-disabled' : '')
            }
            required={isRequiredInput}
            disabled={isDisabled}
            onKeyPress={onKeyPress}
            value={value}
            placeholder={placeholder}
            type={type}
            onChange={onInputChange}
            {...inputArgs}
          />
        ) : (
          <input
            className={
              'text-input' +
              (errorFeedback ? ' text-input-error' : '') +
              (isDisabled ? ' text-input-disabled' : '')
            }
            required={isRequiredInput}
            disabled={isDisabled}
            onKeyPress={onKeyPress}
            value={value}
            placeholder={placeholder}
            type={type}
            onChange={onInputChange}
            {...inputArgs}
          />
        )}
        {inputType == 'password' ? (
          <img
            className={'text-input-password-eye'}
            onClick={() => {
              type === 'text' ? setType('password') : setType('text');
            }}
            src={type === 'text' ? EyeSolid : EyeSlash}
            alt="show password"
          />
        ) : (
          <></>
        )}
      </div>
      {errorFeedback ? <p className="text-input-error-message">{errorFeedback}</p> : <></>}
      {description ? <p className="text-input-description">{description}</p> : <></>}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  isRequiredInput: PropTypes.bool,
  errorFeedback: PropTypes.string,
  onChange: PropTypes.func,
  onEnterKey: PropTypes.func,
  localStorageKey: PropTypes.string,
  isDisabled: PropTypes.bool,
  inputArgs: PropTypes.object,
  initialValue: PropTypes.string,
  hasRestrictedInput: PropTypes.bool,
  inputType: PropTypes.oneOf(['text', 'textArea', 'password', 'date']),
};

export { TextInput };
