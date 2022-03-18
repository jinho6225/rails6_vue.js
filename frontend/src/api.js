const url = "http://localhost:3000/api/v1/todos"

export const api = {
    getList: async () => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    },
    addList: async (title) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ todo: {title, completed: false}})
        });
        const data = await res.json();
        return data;
    },
    removeTodo: async (id) => {
        const res = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
        return res;
    },
    completeTodo: async (id, completed) => {
        const res = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ todo: {completed: !completed}})
        });
        const data = await res.json();
        return data;
    },
    updateTodo: async (title, id) => {
        const res = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ todo: { title }})
        });
        const data = await res.json();
        return data;
    },
}
