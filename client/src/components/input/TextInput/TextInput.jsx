import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TextInput.scss';
import EyeSolid from '../../../../assets/icons/eye-solid.svg';
import EyeSlash from '../../../../assets/icons/eye-slash-solid.svg';

import EyeSolidDarkMode from '../../../assets/darkmode/icons/eye-solid.svg';
import EyeSlashDarkMode from '../../../assets/darkmode/icons/eye-slash-solid.svg';
import { DarkModeContext } from '../../../util/DarkModeProvider';

const TextInput = ({
  label,
  placeholder,
  description,
  isRequiredInput,
  errorFeedback,
  onChange,
  onKeyDown,
  localStorageKey,
  isDisabled,
  inputArgs,
  initialValue,
  value,
  hasRestrictedInput,
  inputType,
  inputTitle,
  isPhoneNumber,
  isInstagram,
  style,
  clearText,
  setClearText,
  isUtorID,
  maxLength,
  autocomplete,
  cancelEdit,
  oldValue,
  autoFocus,
}) => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  useEffect(() => {
    if (localStorageKey !== undefined) {
      const storedString = localStorage.getItem(localStorageKey);
      if (storedString === null) {
        if (initialValue !== undefined) {
          onChange(initialValue);
        } else {
          onChange('');
        }
      } else {
        onChange(storedString);
      }
    } else if (initialValue !== undefined) {
      onChange(initialValue);
    }
  }, []);

  const [internalValue, setInternalValue] = useState(
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

  useEffect(() => {
    if (clearText) {
      setInternalValue('');
      setClearText(false);
    }
  }, [clearText]);

  useEffect(() => {
    if (isDisabled) {
      setInternalValue('');
    }
  }, [isDisabled]);

  useEffect(() => {
    setInternalValue(oldValue);
  }, [cancelEdit]);

  const [type, setType] = useState(inputType ? inputType : 'text');

  const onInputChange = (event) => {
    let newValue = event.target.value;
    if (hasRestrictedInput) {
      newValue = newValue.replace(/[^\w\n!@#$%^&*()\-+={}[\]:";'<>,./?~`\\ ]+/g, '');
    }
    if (isPhoneNumber) {
      newValue = newValue.replace(/\D/g, '');
      // let cleaned = ('' + newValue).replace(/\D/g, '');
      // let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      // if (match) {
      //   newValue = '(' + match[1] + ') ' + match[2] + '-' + match[3];
      // }
      let size = newValue.length;
      if (size < 4 && size > 0) {
        newValue = '(' + newValue;
      } else if (size < 7) {
        newValue = '(' + newValue.substring(0, 3) + ') ' + newValue.substring(3, 6);
      } else if (size <= 10) {
        newValue =
          '(' +
          newValue.substring(0, 3) +
          ') ' +
          newValue.substring(3, 6) +
          '-' +
          newValue.substring(6, 10);
      }
    }
    if (isInstagram) {
      if (newValue !== '' && !newValue.includes('@')) {
        newValue = '@' + newValue;
      }
    }
    if (isUtorID) {
      newValue = newValue.replace(' ', '').toLowerCase();
    }
    if (maxLength) {
      if (newValue !== undefined && maxLength < newValue.length) {
        newValue = newValue.substring(0, newValue.length - 1);
      }
    }

    onChange ? onChange(newValue) : 0;
    if (value === undefined) setInternalValue(newValue);
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, newValue);
    }
  };

  return (
    <div
      className={`text-input-container ${
        label === undefined ? 'text-input-container-no-margin' : ''
      } ${isDisabled === true ? 'text-input-disabled-container' : ''}`}
    >
      <div
        className={
          'text-input-title-container' + (isDisabled ? ' text-input-title-container-disabled' : '')
        }
      >
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
            onKeyDown={onKeyDown}
            value={value ?? internalValue ?? ''}
            placeholder={placeholder}
            type={type}
            autoComplete={autocomplete}
            onChange={onInputChange}
            {...inputArgs}
            style={{ ...style }}
            autoFocus={autoFocus ?? false}
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
            onKeyDown={onKeyDown}
            value={value ?? internalValue ?? ''}
            placeholder={placeholder}
            type={type}
            autoComplete={autocomplete}
            onChange={onInputChange}
            {...inputArgs}
            autoFocus={autoFocus ?? false}
          />
        )}
        {inputType == 'password' ? (
          <>
            {!darkMode ? (
              <img
                className={'text-input-password-eye'}
                onClick={() => {
                  type === 'text' ? setType('password') : setType('text');
                }}
                src={type === 'text' ? EyeSolid : EyeSlash}
                alt="show password"
              />
            ) : (
              <img
                className={'text-input-password-eye'}
                onClick={() => {
                  type === 'text' ? setType('password') : setType('text');
                }}
                src={type === 'text' ? EyeSolidDarkMode : EyeSlashDarkMode}
                alt="show password"
              />
            )}
          </>
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
  onKeyDown: PropTypes.func,
  localStorageKey: PropTypes.string,
  isDisabled: PropTypes.bool,
  inputArgs: PropTypes.object,
  initialValue: PropTypes.string,
  value: PropTypes.string,
  hasRestrictedInput: PropTypes.bool,
  inputType: PropTypes.oneOf(['text', 'textArea', 'password', 'date']),
  inputTitle: PropTypes.string,
  isPhoneNumber: PropTypes.bool,
  isInstagram: PropTypes.bool,
  isUtorID: PropTypes.bool,
  maxLength: PropTypes.number,
  autocomplete: PropTypes.string,
  style: PropTypes.object,
  clearText: PropTypes.bool,
  setClearText: PropTypes.func,
  cancelEdit: PropTypes.bool,
  oldValue: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export { TextInput };
