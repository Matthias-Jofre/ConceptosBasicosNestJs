import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';

import { Response } from "express";

import { ProductsService } from "../services/products.service";

import { ParseIntPipe } from "../common/parse-int/parse-int.pipe";

import { CreateProductDto, UpdateProductDto } from "../dtos/products.dtos";

@Controller('products')
export class ProductsController {

  constructor(private productService: ProductsService) { }

  @Get('filter')
  getProductFilter() {
    return `Soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  // getOne(@Param('productId', ParseIntPipe) productId: number) {
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // getOne(@Res() response: Response, @Param('productId') productId: string) {
    // response.status(200).send({
    //     message: `product ${productId}`

    // })
    return this.productService.findOne(productId)
  }

  @Get()
  getProducts(@Query('limit') limit = 100, @Query('offset') offset = 0, @Query('brand') brand: string,
  ) {
    return this.productService.findAll()
    // return {
    //     message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`
    // }
  }
  // Example: http://localhost:3000/products?brand=ewewe?&limit=199999

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //     message: 'acción de crear', payload
    // }
    return this.productService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    // return {
    //     id,
    //     payload
    // }
    return this.productService.update(+id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    // return {
    //     id
    // }
    return this.productService.remove(+id)
  }

}
