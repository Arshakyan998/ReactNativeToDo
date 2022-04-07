const handler={
    "CHANGE_STATE":(id)=>{
        return id
    },
    default:()=>null

}



export const screenReducer = (_, action) => {


    const result = handler[action.type] || handler.default

    return result(action.payload)


}
