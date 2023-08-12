const FlexContainer = ({ padding = "p-10", children }) => {
    

    return (
        <div className={`mx-auto w-full max-w-lg bg-gray-300 ${padding} rounded-xl shadow-black shadow-lg my-8`} >
            {children}
        </div>
    )

}

export default FlexContainer