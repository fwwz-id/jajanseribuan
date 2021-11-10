import { createContext, useEffect, useState } from "react";

// utils
import { Get } from "../utils/crud";

export const RekapContext = createContext();

const RekapProvider = ({ children }) => {
	const [rekaps, setRekaps] = useState([]);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// functions
	const getRekaps = async () => {
		// this will return {message, data} so we destruct data only
		const { data } = await Get("lists");

		setRekaps(data);
		setIsLoading(false);
	};

	useEffect(() => {
		if (isUpdate) {
			setIsLoading(true);
			getRekaps();
			setIsUpdate(false);
			setIsLoading(false);
		} else if (isLoading) {
			getRekaps();
			setIsLoading(false);
		} else {
			getRekaps();
		}
	}, [isUpdate, isLoading]);

	return (
		<RekapContext.Provider
			value={{
				rekaps,
				isUpdate,
				isLoading,
				setRekaps,
				setIsUpdate,
				setIsLoading,
			}}
		>
			{children}
		</RekapContext.Provider>
	);
};

export default RekapProvider;
