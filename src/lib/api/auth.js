import API from ".";

export const login = async ({ username, password, role }) => {
   return (await API.post("/login", { username, password, role })).data;
};

export const checkAuth = async () => {
   return (await API.get("/check")).data;
};
