import React from 'react';
import PropTypes from 'prop-types';

const Helmet = (props) => {
    document.title = "More Than Happy - " + props.title;
    return (
        <div className='w-100'>
            {props.children}
        </div>
    );
};

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired // Prop validation for children
};

export default Helmet;
