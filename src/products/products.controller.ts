import {
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ProductsService } from './services/products.service';
import { CreateAgendaResponse } from './interfaces/create-products-response.interface';
import { Product } from './schemas/products.schema';
import { ProductInterface } from './interfaces/products.interface';

@Controller('products')
export class ProductsController {
  constructor(
    private jwtService: JwtService,
    private productsService: ProductsService,
  ) {}

  @Post('creatProduct')
  async creatProduct(
    @Body() reqBody: ProductInterface,
    @Req() req: any,
  ): Promise<CreateAgendaResponse> {
    const token = req.cookies?.['access_token'];
    console.log(token)
    if (!token) throw new UnauthorizedException('No token');
    if (token) {
      await this.productsService.create({
        ...reqBody,
      });
      return { status: 'success' };
    }
    throw new NotFoundException({
      message: 'The Action has Failed.',
    });
  }

  @Get('getAllProducts')
  async getAllAgenda(): Promise<Product[]> {
    try {
      return await this.productsService.getAll();
    } catch (error) {
      throw new NotFoundException({
        message: 'The Action has Failed.',
        error: error.message || error,
      });
    }
  }
}
