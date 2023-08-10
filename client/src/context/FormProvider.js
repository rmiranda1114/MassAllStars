import { createContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
    const [formId, setFormId] = useState({
        parentId: null,
        playerId: [],
        emergencyId: [],
        page: 1
    });

    return (
        <FormContext.Provider value={{ formId, setFormId }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;