import { registerDecorator, ValidationOptions } from 'class-validator';
import { UserExistsValidator } from '../validators/user_exist.validator';

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserExistsValidator,
    });
  };
}