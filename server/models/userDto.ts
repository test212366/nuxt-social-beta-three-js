export default class UserDto {
	email
	id
	isActivated
	userName
	constructor(model:any) {
		 this.email = model.email
		 this.userName = model.userName
		 this.id = model._id
		 this.isActivated = model.isActivated
	}
}