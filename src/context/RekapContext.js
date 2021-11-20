import { createContext } from "react";

import useSWR from "swr";

export const RekapContext = createContext();

const RekapProvider = ({ children }) => {
	const url = "https://jajananseribuan-api.herokuapp.com/api/v1/lists";
	const { data, error } = useSWR(url);

	return (
		<RekapContext.Provider
			value={{
				data,
				error,
			}}
		>
			{children}
		</RekapContext.Provider>
	);
};

export default RekapProvider;
