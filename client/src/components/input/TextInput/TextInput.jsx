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
  inputTitle,
  isPhoneNumber,
  isInstagram,
}) => {
  useEffect(() => {
    if (localStorageKey !== undefined) {
      onChange(localStorage.getItem(localStorageKey));
    } else if (initialValue !== undefined) {
      onChange(initialValue);
    }
  }, []);

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
    if (isPhoneNumber) {
      value = value.replace(/\D/g, '');
      let cleaned = ('' + value).replace(/\D/g, '');
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        value = '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
    }
    if (isInstagram) {
      if (value !== '' && !value.includes('@')) {
        value = '@' + value;
      }
    }

    onChange ? onChange(value) : 0;
    setValue(value);
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, value);
    }
  };

  return (
    <div
      className={`text-input-container ${
        label === undefined ? 'text-input-container-no-margin' : ''
      } ${isDisabled === true ? 'text-input-disabled-container' : ''}`}
    >
      <div className="text-input-title-container">
        {label !== undefined ? <p className="text-input-title">{label}</p> : <></>}
        {isRequiredInput !== undefined && isRequiredInput === true && label !== undefined ? (
          <p className="text-input-required-star">*</p>
        ) : (
          <></>
        )}
      </div>
      <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
        {inputType == 'textArea' ? (
          <textarea
            title={inputTitle}
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
            title={inputTitle}
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
  inputTitle: PropTypes.string,
  isPhoneNumber: PropTypes.bool,
  isInstagram: PropTypes.bool,
};

export { TextInput };
