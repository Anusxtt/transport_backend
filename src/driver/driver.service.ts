import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { User } from '../users/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerDriver(
    userId: number,
    firstname: string,
    lastname: string,
    idCardNumber: string,
    status: string = 'upload_required', // ✅ เพิ่มค่า default
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    console.log(
      `✅ Registering Driver for User ID: ${userId} with status: ${status}`,
    );

    const newDriver = this.driverRepository.create({
      user,
      firstname,
      lastname,
      idCardNumber,
      status, // ✅ ต้องแน่ใจว่า `status` ถูกกำหนด
    });

    await this.driverRepository.save(newDriver);
    console.log(
      `✅ Driver created with ID: ${newDriver.id}, Status: ${newDriver.status}`,
    );
    return newDriver;
  }

  async findDriverByUserId(userId: number): Promise<Driver | null> {
    const driver = await this.driverRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    console.log(
      `🔍 Fetching Driver for User ID: ${userId}, Found: ${driver ? driver.status : 'Not Found'}`,
    );

    return driver;
  }

  async uploadDocuments(
    driverId: number,
    licenseImageBuffer: Buffer,
    idCardImageBuffer: Buffer,
    vehicleRegistrationImageBuffer: Buffer,
  ) {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const licensePath = `${driverId}-license.jpg`;
    const idCardPath = `${driverId}-idcard.jpg`;
    const vehiclePath = `${driverId}-vehicle.jpg`;

    fs.writeFileSync(path.join(uploadDir, licensePath), licenseImageBuffer);
    fs.writeFileSync(path.join(uploadDir, idCardPath), idCardImageBuffer);
    fs.writeFileSync(
      path.join(uploadDir, vehiclePath),
      vehicleRegistrationImageBuffer,
    );

    await this.driverRepository.update(driverId, {
      licenseImage: `/uploads/${licensePath}`,
      idCardImage: `/uploads/${idCardPath}`,
      vehicleRegistrationImage: `/uploads/${vehiclePath}`,
      status: 'pending',
    });

    console.log(`✅ Saved images for Driver ID: ${driverId}`);
  }

  async findPendingDrivers() {
    return this.driverRepository.find({
      where: { status: 'pending' },
      relations: ['user'],
    });
  }

  async approveDriver(driverId: number, adminName: string) {
    await this.driverRepository.update(driverId, {
      status: 'approved',
      approvedBy: adminName,
    });
    return { message: 'Driver approved' };
  }

  async rejectDriver(driverId: number, adminName: string) {
    await this.driverRepository.update(driverId, {
      status: 'rejected',
      approvedBy: adminName,
    });
    return { message: 'Driver rejected' };
  }
}
