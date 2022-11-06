import httpService from "./http.services";
const todosEndpoint = "todos/";

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        limit: 10,
      },
    });
    return data;
  },
  createTask: async (payload) => {
    const { data } = await httpService.post(todosEndpoint, payload);
    return data;
  },
};

export default todosService;
