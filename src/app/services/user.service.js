import httpService from "./http.service";
import localStorageService from "./localStorageServices";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUsers: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    }
};
export default userService;
