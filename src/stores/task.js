import { defineStore } from "pinia";
import moment from "moment";

export const useTaskStore = defineStore({
    id: "task",
    state: () => ({
        projects: ["Project 1", "Project 2", "Project 3", "Project 4"],
        entries: [],
        timeEntry: "",
        hours: "",
        description: "",
        project: "",
    }),
    actions: {
        addTaskEntry(
            username,
            timeEntry,
            hours,
            description,
            project,
            timestamp = moment().format("YYYY-MM-DD HH:mm:ss")
        ) {
            const task = {
                username,
                timeEntry,
                hours,
                description,
                project,
                timestamp,
            };
            this.entries.push(task);
        },
    },
});
