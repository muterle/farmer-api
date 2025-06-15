import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmersModule } from './farmers/farmers.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmsModule } from './farms/farms.module';
import { HarvestsModule } from './harvests/harvests.module';
import { CultivatedCropsModule } from './cultivated-crops/cultivated-crops.module';
import { CustomLogger } from './shared/logger/custom-logger';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      schema: process.env.DATABASE_SCHEMA,
      autoLoadEntities: true,
      ssl:
        process.env.NODE_ENV === 'development'
          ? false
          : {
              rejectUnauthorized: false,
            },
      cache: true,
    }),
    FarmersModule,
    AuthModule,
    UsersModule,
    FarmsModule,
    HarvestsModule,
    CultivatedCropsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
  exports: [CustomLogger],
})
export class AppModule {}
