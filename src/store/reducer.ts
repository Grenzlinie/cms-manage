const defaultState = {
    //MyHeader组件的key
    key: 1
}

interface IAction {
    type: string;
    value?: unknown;
}

// esline-disable-next-line
const a =  (state = defaultState, action: IAction) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "changeKey":
            newState.key++;
            break;
        default:
            break;
    }
    return newState;
}

export default a;