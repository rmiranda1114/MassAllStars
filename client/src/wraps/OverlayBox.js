
const OverlayBox = ({ children }) => {

    return (
        <div className=" fixed top-1/4 mx-auto inset-x-0 max-w-md text-center bg-slate-200 p-4 rounded-lg border-black shadow-lg">
            {children}
        </div>
    )

}

export default OverlayBox