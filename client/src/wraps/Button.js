const Button = ({
    width = 'w-full',
    bg = 'bg-gray-400',
    padding = 'p-2',
    rounded = 'rounded-lg',
    margin = 'my-2',
    hover = 'hover:cursor-pointer`',
    otherStyle = "",
    children,
    handleClick,
    id,
     ...props }) => {

    return (
        <div className={`${width} ${bg} ${padding} ${rounded} ${margin} ${hover} ${otherStyle} font-medium text-center m-auto` } 
            onClick={handleClick} id={id} {...props}>
            {children}
        </div>
    )
}

export default Button;