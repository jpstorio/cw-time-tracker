import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "users",
    state: () => ({
        users: [],
        currentUsername: "",
    }),
    actions: {
        addUser(username, password) {
            const newUser = {
                username,
                password,
            };
            this.users.push(newUser);
        },
    },
});
