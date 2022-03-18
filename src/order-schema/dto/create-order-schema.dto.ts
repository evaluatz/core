export class CreateOrderSchemaDto {
    quantity: number;
    apiKeyId: number;
    symbolName: string;
    strategyId: number;
    lowPredictorID?: string;
    highPredictorID?: string;
}
