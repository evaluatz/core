import { Source } from 'src/source/entities/source.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateApiKeyDto {
    key: string;
    secret: string;
    user: User;
    source: Source;
}
