import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) { }

  @Get()
  get(@Req() req: any) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  add(@Req() req: any, @Body() body: { productId: string; quantity?: number }) {
    return this.cartService.addToCart(req.user.userId, body.productId, body.quantity || 1);
  }

  @Delete('remove/:productId')
  remove(@Req() req: any, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user.userId, productId);
  }

  @Delete('clear')
  clear(@Req() req: any) {
    return this.cartService.clearCart(req.user.userId);
  }
}
