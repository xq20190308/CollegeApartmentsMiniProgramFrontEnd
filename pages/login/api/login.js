import { service } from "../../../utils/http.js"

export function login(user) {
	return service("/user/loginInnerTest", "POST", user)
}