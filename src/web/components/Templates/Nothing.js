import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Template = ({ pageTitle, children }) => (
  <>
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>

    {children}
  </>
);

Template.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Template.defaultProps = {
  pageTitle: 'React App',
};

export default Template;
