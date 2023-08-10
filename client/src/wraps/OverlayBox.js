
const OverlayBox = ({ children }) => {

    return (
        <div className=" fixed top-1/4 mx-auto inset-x-0 max-w-lg text-center bg-white border p-4 rounded-lg border-black shadow-lg">
            {children}
        </div>
    )

}

export default OverlayBox