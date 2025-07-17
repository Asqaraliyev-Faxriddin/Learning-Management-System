import { EverificationTypes } from "src/common/types/verification";

export function getMessages(type:EverificationTypes,otp:string){

    switch(type){
        case EverificationTypes.REGISTER:
            return `Najot platformasidan ro'yxatdan o'tish uchun code :${otp}\n Bu code ni xech kimga bermang!`

            case EverificationTypes.RESET_PASSWORD:
            return `Najot platformasidan passwordni almashtirish uchun code :${otp}\n Bu code ni xech kimga bermang!`

            case EverificationTypes.EDIT_PHONE:
            return `Najot platformasidan telefon nomerni almashtirish uchun code :${otp}\n Bu code ni xech kimga bermang!`
            
    }
}