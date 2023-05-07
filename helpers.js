import { formatDistanceToNow } from "date-fns";
import ru from "date-fns/locale/ru";

export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export const formatDistanceToNowPost = (date) => {
	return formatDistanceToNow(date, { locale: ru, addSuffix: true })
	}