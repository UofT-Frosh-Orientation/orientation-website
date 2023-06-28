import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    if (clearText) {
      setValue('');
      setClearText(false);
    }
  }, [clearText]);

  useEffect(() => {
    setValue(oldValue);
  }, [cancelEdit]);

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
      // let cleaned = ('' + value).replace(/\D/g, '');
      // let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      // if (match) {
      //   value = '(' + match[1] + ') ' + match[2] + '-' + match[3];
      // }
      let size = value.length;
      if (size < 4 && size > 0) {
        value = '(' + value;
      } else if (size < 7) {
        value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6);
      } else if (size <= 10) {
        value =
          '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
      }
    }
    if (isInstagram) {
      if (value !== '' && !value.includes('@')) {
        value = '@' + value;
      }
    }
    if (isUtorID) {
      value = value.replace(' ', '').toLowerCase();
    }
    if (maxLength) {
      if (value !== undefined && maxLength < value.length) {
        value = value.substring(0, value.length - 1);
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
            onKeyPress={onKeyPress}
            value={value ?? ''}
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
            onKeyPress={onKeyPress}
            value={type === 'date' ? localStorage.getItem(localStorageKey) : value ?? ''}
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
