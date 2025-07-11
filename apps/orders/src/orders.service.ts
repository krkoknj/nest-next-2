import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { Repository } from 'typeorm';
import { OrderEntity } from './entites/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    // private readonly client: PrismaService,
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest, user: any) {
    const order = this.orderRepo.create(request);
    await this.orderRepo.save(order);
    console.log('request->>>>>>>>>>>>>>>>>>', request);
    await lastValueFrom(
      this.billingClient.emit('order_created', { request, user }),
    );
    return order;
  }

  async getOrders() {
    return this.orderRepo.find();
  }
}
