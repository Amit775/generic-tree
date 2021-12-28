import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'type' })
export class TypePipe<T> implements PipeTransform {
    transform(value: T): T {
        return value;
    }
}