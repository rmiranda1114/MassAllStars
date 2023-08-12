const FlexCard = ({ 
    margin = "m-0",
    padding = "p-4",
    width = "w-full",
    max = "max-w-xs",
    bg = "bg-gray-300",
    rounded = "rounded-xl",
    hover= "hover:curser-pointer",
    otherStyle = "",
    children,
     ...props}) => {
    

    return (
        <div className={`${margin} ${width} ${max} ${bg} ${padding} ${rounded} ${otherStyle} shadow-black shadow-lg`} {...props}>
            {children}
        </div>
    )

}

export default FlexCard