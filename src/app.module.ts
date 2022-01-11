import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensModule } from './screens/screens.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { ContentModule } from './content/content.module';
import { PlaylistContentModule } from './playlist-content/playlist-content.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // TODO: do not forget change to db, move it to the app.env
      username: 'example',
      password: 'example',
      database: 'example',
      autoLoadEntities: true,
      synchronize: true,
      logger: 'simple-console',
      logging: 'all',
    }),
    ScreensModule,
    PlaylistsModule,
    ContentModule,
    PlaylistContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
