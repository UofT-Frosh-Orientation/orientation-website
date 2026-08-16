import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScuntRules.scss';
import { rules } from '../../util/scunt-constants';
import { Header } from '../../components/text/Header/Header';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { ScuntTitle } from '../../components/ScuntTitle/ScuntTitle.jsx';
import RetroStar from '../../assets/schedule/schedule-retro-star.png';

export const PageScuntRules = () => {
  return (
    <div className="scunt-page-wrapper">
      <ScuntTitle />
      <ScuntLinks />

      <div className="scunt-rules-page">
        <div className="rules-title-wrapper">
          <h1 className="rules-title script-font">The</h1>
          <h1 className="rules-title script-font">Rules</h1>

          <img src={RetroStar} className="rules-star rules-star-big" alt="decorative star" />
          <img src={RetroStar} className="rules-star rules-star-medium" alt="decorative star" />
          <img src={RetroStar} className="rules-star rules-star-small" alt="decorative star" />
        </div>
        <div className="scunt-rules-container">
          <ol className="scunt-rules-list">
            {rules.start.map((rule, index) => {
              return <ScuntRule key={index} title={rule.title} sub={rule.sub} items={rule.items} />;
            })}
          </ol>
        </div>
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
