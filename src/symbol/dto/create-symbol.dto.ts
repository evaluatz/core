import { Coin } from 'src/coin/entities/coin.entity';

export class CreateSymbolDto {
    name: string;
    from: Coin;
    to: Coin;
    active?: boolean;
}
