import { home ,head , load ,loginData , instData ,instInfo,client} from './home'
import {borrower} from "./borrower"
import {partyData} from "./party"
import {credit} from "./credit"
import {loan} from "./loan"
const rootReducer = {
  /* your reducers */
  home, //首页相关
    head,
    load,
    loginData,
    instData,
    borrower,
    instInfo,
    client,
    partyData,
    credit,
    loan
}
export default rootReducer
