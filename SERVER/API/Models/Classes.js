class User {
    constructor(){
        this.userName = userName;
        this.gender = gender;
        this.password = password;;
        this.birthday = birthday;
    }
    age(){
        let date = new Date();
        return date.getDate() - this.birthday;
    }
}


class Match {


}


