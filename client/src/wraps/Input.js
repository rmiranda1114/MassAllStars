import Label from "./Label"

const Input = ({ id, label = "", styles, value, onChange, ...inputProps }) => {
    styles = "w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400"

    return (
        <div>
            {label && <Label id={id} label={label} />}
            <input className={styles} type="text" id={id} name={id} value={value} onChange={onChange} {...inputProps} />
        </div>
    )

}

export default Input


