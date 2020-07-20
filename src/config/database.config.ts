import { ConfigService } from "../services";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default <TypeOrmModuleOptions>{
  type: "mongodb",
  database: ConfigService.get("DATABASE_NAME"),
  host: ConfigService.get("DATABASE_HOST"),
  port: ConfigService.get("DATABASE_PORT") || 27017,
  entities: ["dist/**/*.model{.ts,.js}"],
  synchronize: false
};
