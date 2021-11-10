const url = "https://jajananseribuan-api.herokuapp.com/api";

export async function Create(endpoint, data) {
	return await fetch(`${url}/v1/${endpoint}`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "Application/json",
		},
		body: JSON.stringify(data),
	});
}

export async function Get(endpoint) {
	return await (await fetch(`${url}/v1/${endpoint}`)).json();
}

export async function Update(endpoint, id, data) {
	return await fetch(`${url}/v1/${endpoint}/${id}`, {
		method: "PUT",
		mode: "cors",
		headers: {
			"Content-Type": "Application/json",
		},
		body: JSON.stringify(data),
	});
}

export async function Delete(endpoint, id) {
	return await fetch(`${url}/v1/${endpoint}/${id}`, {
		method: "DELETE",
		mode: "cors",
		headers: {
			"Content-Type": "Application/json",
		},
	});
}
