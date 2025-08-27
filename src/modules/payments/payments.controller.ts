import {Body,Controller,Get,Post,Req,Res,UseGuards,} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymeRequest } from 'src/common/types/payments/payme'; 
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
import { Roles } from 'src/common/decorators/Roles.decorator'; 
import { UserRole, Users } from '@prisma/client'; 
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('Payment')
@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: UserRole.STUDENT })
  @ApiBearerAuth()
  @UseGuards( AuthGuard , RolesGuard)
  @Roles(UserRole.STUDENT)
  @Post('api/payment/checkout')
  createPayment(@Body() payload: CreatePaymentDto, @Req() req: any) {
    return this.paymentsService.createPayment(payload, req.user as Users);
  }

  @ApiExcludeEndpoint()
  @Post('payment/payme/gateway')
  paymeRequest(
    @Body() payload: PaymeRequest,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.paymentsService.handlePaymeRequest(payload, req, res);
  }

  @ApiExcludeEndpoint()
  @Get('payment/delete-transactions')
  deleteAllTransactions() {
    return this.paymentsService.deleteTransactions();
  }
}
