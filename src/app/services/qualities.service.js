import httpService from "./http.service";
const professionEndpoint = "quality/";
const qualitiesServices = {
    fetchAll: async () => {
        const { data } = await httpService.get(professionEndpoint);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(professionEndpoint + id);
        return data;
    }
};

export default qualitiesServices;
