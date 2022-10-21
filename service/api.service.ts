import { ApiRepository } from '../repository/api.repository';

export class ApiService {

    private apiRepository: ApiRepository;

    constructor() {
        this.apiRepository = new ApiRepository();
    }

    async getItemQuery(item) {
        return await this.apiRepository.getItemQuery(item);
    }

    async getItem() {
        return await this.apiRepository.getItem();
    }

    async getPostCode() {
        return await this.apiRepository.getPostCode();
    }

    async getPostCodeAvg(postCode) {
        return await this.apiRepository.getPostCodeAvg(postCode);
    }

    async createItem(item) {
        return await this.apiRepository.createItem(item);
    }

    async updateItem(item) {
        return await this.apiRepository.updateItem(item);
    }

    async deleteItem(itemId) {
        return await this.apiRepository.deleteItem(itemId);
    }

}