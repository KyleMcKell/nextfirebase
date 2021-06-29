import React from 'react';

interface Props {
	show: boolean;
}

function Loader({ show }: Props) {
	return show ? <div className="loader" /> : null;
}

export default Loader;
