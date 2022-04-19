import { Inject, Injectable } from '@nestjs/common';
import { OrderSchema } from 'src/order-schema/entities/order-schema.entity';
import { enumOrderStatus, OrderStatus } from 'src/order-status/entities/order-status.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Spot } from '@binance/connector';

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>,
        @Inject('ORDER_SCHEMA_REPOSITORY')
        private orderSchemaRepository: Repository<OrderSchema>,
        @Inject('ORDER_STATUS_REPOSITORY')
        private orderStatusRepository: Repository<OrderStatus>,
    ) {}
    async create(createOrderDto: CreateOrderDto) {
        const { isBuy, value, schemaId, orders } = createOrderDto;
        const schema = await this.orderSchemaRepository.findOne({
            where: { id: schemaId },
            relations: ['apiKey', 'symbol'],
        });
        const status = await this.orderStatusRepository.findOne(8);
        const newOrderSchema = this.orderRepository.create({
            createdAt: new Date(),
            isBuy,
            value,
            schema,
            status,
        });
        const newOrder = await this.orderRepository.save(newOrderSchema);
        const newStatus = await this.orderStatusRepository.findOne(0);
        let qntOrders = 1;
        if (orders && orders.length > 0) {
            qntOrders = (
                await Promise.all(
                    orders.map(async (o) => {
                        const order = await this.orderRepository.findOne({
                            where: { id: o },
                            relations: ['orders'],
                        });
                        order.belongsTo = newOrder;
                        await this.orderRepository.save(newOrder);
                        await this.remove(o);
                        return order.orders?.length || 1;
                    }),
                )
            ).reduce((pv, cv) => pv + cv, 0);
        }
        return this.executeOrder(newOrder, newStatus, qntOrders);
    }

    findAll() {
        return this.orderRepository.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['status', 'orders', 'belongsTo'],
        });

        return {
            ...order,
            status: order?.status?.name,
        };
    }

    async update() {
        const orderSchemas = await this.orderSchemaRepository.find({
            where: { active: true },
            relations: ['apiKey', 'symbol'],
        });
        return await orderSchemas.map(async (orderSchema) => {
            const binanceClient = new Spot(orderSchema.apiKey.key, orderSchema.apiKey.secret);
            const ordersBinance = await binanceClient
                .allOrders(orderSchema.symbol.name)
                .then(({ data }) => data);

            await Promise.all(
                ordersBinance.map(async (o) => {
                    const order = await this.orderRepository.findOne({
                        where: { sourceOrderId: o.orderId },
                        relations: ['status'],
                    });
                    if (order && order.status && order.status.name != o.status) {
                        const status = await this.orderStatusRepository.findOne({ name: o.status });
                        if (status) {
                            order.status = status;
                            await this.orderRepository.save(order);
                        }
                    }
                    return o;
                }),
            );
        });
    }

    async remove(id: number) {
        const order = await this.orderRepository.findOneOrFail({
            where: { id },
            relations: ['schema', 'schema.apiKey', 'schema.symbol'],
        });

        const newStatus = await this.orderStatusRepository.findOne(-1);
        return this.executeOrder(order, newStatus);
    }

    async executeOrder(order: Order, newStatus: OrderStatus, schemaQnt: number = 1) {
        const { schema } = order;

        const status = await this.orderStatusRepository.findOne(8);
        order.status = status;
        await this.orderRepository.save(order);

        switch (newStatus.name) {
            case enumOrderStatus.NEW: {
                const { symbol } = schema;
                const side = order.isBuy ? 'BUY' : 'SELL';
                const type = 'LIMIT';
                const options = {
                    timeInForce: 'GTC',
                    quantity: (+schema.quantity * schemaQnt).toFixed(8),
                    price: +order.value,
                };
                const binanceClient = new Spot(schema.apiKey.key, schema.apiKey.secret);
                try {
                    const orderBinance = await binanceClient
                        .newOrder(symbol.name, side, type, options)
                        .then(({ data }) => data);
                    order.status = newStatus;
                    order.sourceOrderId = orderBinance.orderId;
                    return await this.orderRepository.save(order);
                } catch (e) {
                    console.log(e);
                }
            }
            case enumOrderStatus.CANCELED: {
                const { symbol } = schema;
                const options = {
                    orderId: order.sourceOrderId,
                };
                const binanceClient = new Spot(schema.apiKey.key, schema.apiKey.secret);
                const orderBinance = await binanceClient.cancelOrder(symbol.name, options);
                order.status = newStatus;
                await await this.orderRepository.save(order);
            }
        }
    }
}
