import { service } from "../../../utils/http.js"

export function login(user) {
	return service("/user/login", "POST", user)
}