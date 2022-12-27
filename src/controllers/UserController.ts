import { User } from "../model/user.entity";
import Mail from "../utils/Mail"; 

class UserController{
    mail: Mail;

    constructor(){
        this.mail = new Mail();
    }
    public async confirmEmail (pin: string): Promise<any>{
        let result = {
            statusCode:200,
            msg:''
        };

        try {
            const user = await User.findOne({ 
                where:{
                    pin
                }
             });
    
             if(user){
                await User.update({ active: 1, pin: "" }, {
                    where:{
                        pin
                    }
                });
                result['msg'] = "E-mail verificado com sucesso!"
             }else{
                result['msg'] = "Token inválido!";
                result['statusCode'] = 400; 
             }
        } catch (err) {
            result['msg'] = "Um erro ocorreu ao tentar validar o e-mail."
            result['statusCode'] = 400;
        }
        
        return result;
    }

    public async sendToken(token: string, email: string): Promise<any>{
        console.log(token)       
        this.mail.sendEmail(email, 'Email confirmado.', 'HTML do envio de email.')
    }
}

export default UserController;