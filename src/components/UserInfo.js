export class UserInfo {
    constructor({userNameSelector, userInfoSelector}){
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    // публичный метод возвращает объект с данными пользователя
    getUserInfo(){
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        }
    }

    // публичный метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, info){
        this._userName.textContent = name; //присвоила значению инпута значение тега
        this._userInfo.textContent = info;
    }
}