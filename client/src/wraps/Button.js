const Button = ({ children, handleClick, style = {}, id, ...props }) => {

    const width = style.width || 'w-full';
    const bgcolor = style.bgcolor || 'bg-gray-400';
    const padding = style.padding || 'p-2';
    const rounded = style.rounded || 'rounded-lg';
    const margin = style.margin || 'my-2';



    return (
        <div className={`${width} ${bgcolor} ${padding} ${rounded} ${margin} font-medium text-center hover:cursor-pointer m-auto`} 
            onClick={handleClick} id={id}>
            {children}
        </div>
    )
}

export default Button;