import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Put,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async registerDriver(
    @Req() req: Request,
    @Body() body: { firstname: string; lastname: string; idCardNumber: string },
  ) {
    const userId = (req as any).user.id;

    console.log(`📩 New Driver Registration for User ID: ${userId}`);

    const driver = await this.driverService.registerDriver(
      userId,
      body.firstname,
      body.lastname,
      body.idCardNumber,
      'upload_required',
    );

    return { status: driver.status };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-documents')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'licenseImage', maxCount: 1 },
      { name: 'idCardImage', maxCount: 1 },
      { name: 'vehicleRegistrationImage', maxCount: 1 },
    ]),
  )
  async uploadDocuments(
    @Req() req: Request,
    @UploadedFiles()
    files: {
      licenseImage?: Express.Multer.File[];
      idCardImage?: Express.Multer.File[];
      vehicleRegistrationImage?: Express.Multer.File[];
    },
  ) {
    console.log(
      `📩 Received Upload Request from User ID: ${(req as any).user.id}`,
    );
    console.log(`📂 Uploaded Files:`, files);

    if (
      !files.licenseImage ||
      !files.idCardImage ||
      !files.vehicleRegistrationImage
    ) {
      console.error('❌ Some files are missing! Check file uploads.');
      throw new Error('Missing required files.');
    }

    const driver = await this.driverService.findDriverByUserId(
      (req as any).user.id,
    );
    if (!driver) {
      console.error(`❌ Driver not found for User ID: ${(req as any).user.id}`);
      throw new Error('Driver not found');
    }

    console.log(`✅ Driver found: ID ${driver.id}, updating documents...`);

    return this.driverService.uploadDocuments(
      driver.id,
      files.licenseImage[0].buffer,
      files.idCardImage[0].buffer,
      files.vehicleRegistrationImage[0].buffer,
    );
  }

  @Get('image/:id/:type')
  async getImage(@Param('id') id: number, @Param('type') type: string) {
    const driver = await this.driverService.findDriverByUserId(id);

    if (!driver) {
      return { error: 'Driver not found' };
    }

    let imageUrl: string | null = null;

    switch (type) {
      case 'license':
        imageUrl = driver.licenseImage;
        break;
      case 'idCard':
        imageUrl = driver.idCardImage;
        break;
      case 'vehicle':
        imageUrl = driver.vehicleRegistrationImage;
        break;
      default:
        return { error: 'Invalid image type' };
    }

    if (!imageUrl) {
      return { error: 'Image not found' };
    }

    return { imageUrl };
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async getDriverStatus(@Req() req: Request) {
    const userId = (req as any).user.id;
    const driver = await this.driverService.findDriverByUserId(userId);

    if (!driver) {
      console.log('❌ Driver not found for User ID:', userId);
      return { status: 'not_registered' };
    }

    console.log(`📌 Status for User ID ${userId}: ${driver.status}`);

    function getFullUrl(filePath: string | null): string {
      if (!filePath || filePath.length === 0) return '';
      if (filePath.startsWith('http')) return filePath;
      return `http://192.168.1.138:3000${filePath}`;
    }

    return {
      status: driver.status,
      firstname: driver.firstname,
      lastname: driver.lastname,
      idCardNumber: driver.idCardNumber,
      licenseImage: getFullUrl(driver.licenseImage),
      idCardImage: getFullUrl(driver.idCardImage),
      vehicleRegistrationImage: getFullUrl(driver.vehicleRegistrationImage),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('pending')
  async getPendingDrivers() {
    return this.driverService.findPendingDrivers();
  }

  @UseGuards(JwtAuthGuard)
  @Put('approve/:id')
  async approveDriver(@Param('id') id: number, @Query('admin') admin: string) {
    return this.driverService.approveDriver(id, admin);
  }

  @UseGuards(JwtAuthGuard)
  @Put('reject/:id')
  async rejectDriver(@Param('id') id: number, @Query('admin') admin: string) {
    return this.driverService.rejectDriver(id, admin);
  }
}
