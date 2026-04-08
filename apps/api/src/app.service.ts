import type { BrokerMessage } from "@info-tec/broker-contracts";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getHello() {
		const a: BrokerMessage = {
			id: "1",
			topic: "test",
			payload: {},
			timestamp: new Date(),
		};
		return a;
	}
}
