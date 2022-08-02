import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScuntRules.scss';
import { rules } from '../../util/scunt-constants';
import { Header } from '../../components/text/Header/Header';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';

export const PageScuntRules = () => {
  return (
    <div className="scunt-rules-page">
      <Header text={'Rules'}>
        <ScuntLinks />
      </Header>
      <div className="scunt-rules-container">
        <ol className="scunt-rules-list">
          {rules.start.map((rule, index) => {
            return <ScuntRule key={index} title={rule.title} sub={rule.sub} items={rule.items} />;
          })}
        </ol>
      </div>
    </div>
  );
};

const ScuntRule = ({ title, sub, items }) => {
  return (
    <li>
      <h3>
        <strong>{title}</strong>
      </h3>
      <p>{sub}</p>
      {items && (
        <ol className="scunt-rules-list-inner">
          {items.map((item, index) => {
            return <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>;
          })}
        </ol>
      )}
      <br />
    </li>
  );
};

ScuntRule.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
