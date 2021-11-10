// [
//     {
//         "date": "22 September 2021",
//         "batch": 1,
//         "products": [
//             {
//                 "name": "Potato",
//                 "price": 28000
//             },
//             {
//                 "name": "Rindu",
//                 "price": 29000
//             }
//         ],
//         "packages": [
//             {
//                 "name": "Potato",
//                 "amount": 49
//             },
//             {
//                 "name": "Rindu",
//                 "amount": 48
//             }
//         ],
//         "additionals": [
//             {
//                 "item": "Plastik ukuran 8x20",
//                 "price": 4500,
//                 "amount": 2,
//                 "total": 9000
//             }
//         ],
//         "costs": 66000,
//         "gains": 97000,
//         "net": 31000
//     },
//     {
//         "date": "19 November 2021",
//         "batch": 2,
//         "products": [
//             {
//                 "name": "Krupuk Setan",
//                 "price": 32000
//             },
//             {
//                 "name": "Rindu",
//                 "price": 29000
//             }
//         ],
//         "packages": [
//             {
//                 "name": "Krupuk Setan",
//                 "amount": 67
//             },
//             {
//                 "name": "Rindu",
//                 "amount": 48
//             }
//         ],
//         "costs": 61000,
//         "gains": 115000,
//         "net": 54000,
//         "additionals": []
//     }
// ]

// Todo: create function that take value of array of object
// expectations, return object {...}
// steps:
//      1. look for id
export function getRekapById(id, data) {
	if (id === undefined && typeof id !== "string") return;

	return data.filter(({ _id }) => _id === id);
}

export function getNestedObject(obj, currentId, key) {
	let res;

	if (!Array.isArray(obj)) throw new Error(`Parameter 1 should be an Array`);

	const [current] = obj.filter(({ _id }) => _id === currentId);

	for (let k in current) {
		if (k === key) res = current[k];
	}

	return res;
}

// Todo: create function that can get total every packages
export function getPackages() {}

export function getProducts() {}
