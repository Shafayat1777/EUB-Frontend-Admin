import { useEffect } from 'react';

import RespondingStudent from './response-student';

const Log = () => {
	useEffect(() => {
		document.title = 'FDE Log';
	}, []);
	return (
		<div>
			<RespondingStudent />
		</div>
	);
};
export default Log;
