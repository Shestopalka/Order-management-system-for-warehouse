import { TDto } from 'src/types/tDto.type';

export interface IHandler<T extends TDto, R = void> {
  handle(dto: T): Promise<R>;
}
