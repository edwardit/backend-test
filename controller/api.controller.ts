import { APILogger } from '../logger/api.logger';
import { ApiService } from '../service/api.service';

export class ApiController {

    private apiService: ApiService;
    private logger: APILogger;

    constructor() {
        this.apiService = new ApiService();
        this.logger = new APILogger()
    }

    async getItemQuery(item) {
        this.logger.info('Controller: getItemQuery', item)
        return await this.apiService.getItemQuery(item);
    }

    async getItem() {
        this.logger.info('Controller: getItem', null)
        return await this.apiService.getItem();
    }

    async getPostCode() {
        this.logger.info('Controller: getPostCode', null)
        return await this.apiService.getPostCode();
    }

    async getPostCodeAvg(postCode) {
        this.logger.info('Controller: getPostCodeAvg', postCode)
        return await this.apiService.getPostCodeAvg(postCode);
    }

    async createItem(item) {
        this.logger.info('Controller: createItem', item);
        return await this.apiService.createItem(item);
    }

    async updateItem(item) {
        this.logger.info('Controller: updateItem', item);
        return await this.apiService.updateItem(item);
    }

    async deleteItem(itemId) {
        this.logger.info('Controller: deleteItem', itemId);
        return await this.apiService.deleteItem(itemId);
    }
}