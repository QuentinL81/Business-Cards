import http from "../http-common";

class CardDataService {
    getAll() {
        return http.get("/cards");
    }

    get(id) {
        return http.get(`/cards/${id}`);
    }

    create(data) {
        return http.post("/cards", data);
    }

    duplicate(data){
        return http.post('/cards/duplicate', data);
    }

    update(id, data) {
        return http.put(`/cards/${id}`, data);
    }

    delete(id) {
        return http.delete(`/cards/${id}`);
    }

    deleteAll() {
        return http.delete(`/cards`);
    }
}

export default new CardDataService();