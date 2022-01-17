import { userAuthentication } from "../ApiCall/ApiCall";
import { DEFAULT_CREDENTIAL, GET_USER, LOAD_USER } from "./Action"


export const defaultCredentail = () => ( dispatch ) => {
    dispatch({
        type: DEFAULT_CREDENTIAL
    })
}

export const userAuth = (userName, pass) => async( dispatch ) => {
    dispatch({ type: LOAD_USER , data: true });
    const userDetail = {
        userName, 
        password: pass
    }
    const isUserExists = await userAuthentication(userDetail);
    dispatch({ type: GET_USER, data: isUserExists })
}