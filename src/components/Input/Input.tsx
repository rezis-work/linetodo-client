/* eslint-disable react-refresh/only-export-components */

type Props = {
    type: 'usernameOrEmail' | 'username' | 'email' | 'phone' | 'password',
    value: string,
    onBlur: any,
    onChange: any,
}


export default (props: Props) => {

    const inputType = 
        props.type === 'usernameOrEmail' || 
        props.type === 'username' || 
        props.type === 'phone' ? 'text'
        : props.type;
    
    const inputPlaceholder = 
        props.type === 'usernameOrEmail' ? 'username or email' 
        : props.type;
    
    return(
        <input 
            className="bg-white border-[#E6E8EB] border-solid border rounded-xl w-full h-[56px] focus:outline-none px-[16px] placeholder:font-['Roboto'] placeholder:font-normal placeholder:text-[14px] placeholder:text-[#5F6571]"
            type={inputType}
            placeholder={"Enter your " + inputPlaceholder}
            value={props.value}
            onBlur={props.onBlur}
            onChange={props.onChange}
        />
    )
}