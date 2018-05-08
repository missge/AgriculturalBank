import { home ,head , load ,loginData , instData } from './home'
import {borrower} from "./borrower"
import {partyData} from "./party"

const rootReducer = {
  /* your reducers */
  home, //首页相关
    head,
    load,
    loginData,
    instData,
    borrower,
    partyData
}
export default rootReducer
