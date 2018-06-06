import { home ,head , load ,loginData , instData ,instInfo,client} from './home'
import {borrower} from "./borrower"
import {partyData,relate} from "./party"
import {credit} from "./credit"
import {loan} from "./loan"
import {investi} from "./investi"
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
    loan,
    relate,
    investi
}
export default rootReducer
