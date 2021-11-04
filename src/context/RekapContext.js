import { createContext, useEffect, useState } from "react";

import { Get } from "../utils/crud";

export const RekapContext = createContext();

const RekapProvider = ({ children }) => {
	const [rekap, setRekap] = useState([]);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const getRekap = async () => {
		// this will return {message, data} so we destruct data only
		const { data } = await Get("lists");

		setRekap(data);
		setIsLoading(false);
	};

	useEffect(() => {
		if (isUpdate) {
			setIsLoading(true);
			getRekap();
			setIsUpdate(false);
		}

		getRekap();
	}, [isUpdate]);

	return (
		<RekapContext.Provider
			value={{
				rekap,
				isUpdate,
				isLoading,
				setRekap,
				setIsUpdate,
				setIsLoading,
			}}
		>
			{children}
		</RekapContext.Provider>
	);
};

export default RekapProvider;
