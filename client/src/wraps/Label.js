const Label = ({ id, label}) => {
    return (
        <label className="block text-sm font-medium" htmlFor={id}>{label}</label>
    )

}

export default Label