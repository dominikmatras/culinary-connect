import type { UserRole } from "./UserRole";
export class User {
	constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly role: UserRole,
		public readonly password: string,
		public readonly passwordConfirm: string,
	) {}
}