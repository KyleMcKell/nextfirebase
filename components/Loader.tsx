import React from 'react';

interface Props {
	show: boolean;
}

const Loader = ({ show }: Props) => {
	return show ? <div className="loader" /> : null;
};

export default Loader;
