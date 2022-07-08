import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'notNull' })
export class NotNullPipe<T> implements PipeTransform {
	transform(value: T | null, defaultValue?: T): T {
		if (value == null)  {
			if (defaultValue) return defaultValue;
			else throw `NotNull got a null value withoud a default value`;
		}

		return value;
	}
}