import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensModule } from './screens/screens.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { ContentModule } from './content/content.module';
import { PlaylistContentModule } from './playlist-content/playlist-content.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    TypeOrmModule.forRoot(),
    ScreensModule,
    PlaylistsModule,
    ContentModule,
    PlaylistContentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
