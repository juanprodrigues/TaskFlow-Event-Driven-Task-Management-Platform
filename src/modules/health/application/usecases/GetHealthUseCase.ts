import { Health } from "../../domain/entities/Health";

export class GetHealthUseCase {

    execute(): Health {

        return {
            status: "OK",
            uptime: process.uptime()
        };

    }

}