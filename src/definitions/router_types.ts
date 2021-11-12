export interface CerebroRouter {
    (a): void

}

const myC: CerebroRouter = () => {

    return "Hey"
}

export interface ConstructorParams {
    command: string
    term: string
    display: Function
}

export interface ConfigObj {
    
}