const FlexContainer = ({ 
    padding = "p-6",
    margin = "mx-auto",
    width = "w-full",
    max = "max-w-lg",
    bg = "bg-gray-300",
    rounded = "rounded-xl",
    otherStyle = "",
    children,
     ...props}) => {
    

    return (
        <div className={`${margin} ${width} ${max} ${bg} ${padding} ${rounded} ${otherStyle} shadow-black shadow-lg my-8`} {...props}>
            {children}
        </div>
    )

}

export default FlexContainer