import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: any,
    @Body() body: { items: any[]; shippingAddress?: any },
  ) {
    return this.ordersService.create(
      req.user.userId,
      body.items,
      body.shippingAddress,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  myOrders(@Req() req: any) {
    return this.ordersService.findByUser(req.user.userId);
  }
}
