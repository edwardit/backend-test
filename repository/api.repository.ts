import { connect } from "../config/db.config";
import { APILogger } from '../logger/api.logger';
import { Apis } from "../model/api.model";

export class ApiRepository {

    private logger: APILogger;
    private db: any = {};
    private apiRespository: any;

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
        this.apiRespository = this.db.sequelize.getRepository(Apis);
    }

    async getItem() {
        try {
            const items = await this.apiRespository.findAll();
            console.log('items:::', items);
            return items;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getItemQuery(item) {
        try {
            var option = {
                offset: item.skip,
                limit: item.take
            }
            var result = {
                payload: [],
                count: 0
            }

            if (item.take == 0) delete option.limit
            const items = await this.apiRespository.findAll(option);
            result.payload = items
            result.count = items.length
            console.log('result:::', result);
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getPostCode() {
        try {
            var result = {
                payload: [],
                count: 0
            }
            const items = await this.apiRespository.findAll({
                attributes: ['post_code'],
                group: 'post_code'
            });
            result.payload = items
            result.count = items.length
            console.log('result:::', result);
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getPostCodeAvg(postCode) {
        try {
            var result = {
                payload: {
                    average: "",
                    median: ""
                }
            }
            var list = await this.apiRespository.findAll({
                attributes: ['price'],
                order: ['price'],
                where: {
                    post_code: postCode
                }
            });
            var avg = await this.apiRespository.findAll({
                attributes: [[this.db.sequelize.fn('AVG', this.db.sequelize.col('price')), 'average']],
                where: {
                    post_code: postCode
                }
            });
            avg = avg.map(r => r.get('average'))
            list = list.map(r => r.get('price'))
            var median = this.getMedian(list)
            result.payload.average = avg.toString()
            result.payload.median = median.toString()
            console.log('result:::', result);
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createItem(item) {
        let data = {};
        try {
            data = await this.apiRespository.create(item);
        } catch (err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateItem(item) {
        let data = {};
        try {
            data = await this.apiRespository.update({ ...item }, {
                where: {
                    id: item.id
                }
            });
        } catch (err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteItem(itemId) {
        let data = {};
        try {
            data = await this.apiRespository.destroy({
                where: {
                    id: itemId
                }
            });
        } catch (err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }


    getMedian(values) {
        values.sort(function (a, b) {
            return a - b;
        });
        var half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];
        else
            return (values[half - 1] + values[half]) / 2.0;
    }
}