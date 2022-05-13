import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// TODO: Refactor TextToolTip component
//  - [ ] Props like `description` should not be as many types.
//  - [ ] Missing required props for `OverlayTrigger` should be provided
//  - [ ] Add stories when completed refactoring
//  assignees: jameskokoska

const TextToolTip = ({ description, children, width, placement }) => {
  if (description === '' || description === undefined) {
    return children;
  } else if (width === undefined) {
    return (
      <OverlayTrigger
        placement={placement ?? 'bottom'}
        overlay={
          <Tooltip id={'tooltip'}>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </Tooltip>
        }
      >
        {children}
      </OverlayTrigger>
    );
  } else {
    const length = width ?? '20px';
    return (
      <OverlayTrigger
        placement={this.props.placement === undefined ? 'bottom' : this.props.placement}
        overlay={
          <Tooltip id="tooltip">
            <div dangerouslySetInnerHTML={{ __html: this.props.description }}></div>
          </Tooltip>
        }
      >
        <img
          alt="descriptions"
          src={require('../../../assets/icons/info-circle-solid.svg').default}
          style={{ width: length, height: length, opacity: 0.8 }}
        />
      </OverlayTrigger>
    );
  }
};

TextToolTip.propTypes = {
  description: PropTypes.string || PropTypes.node || undefined,
  children: PropTypes.node,
  width: PropTypes.string,
  placement: PropTypes.string,
};
