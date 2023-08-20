import useForm from '../../hooks/useForm';
import CreateParent from './CreateParent';
import CreateEmergency from './CreateEmergency';
import CreatePlayer from './CreatePlayer';
import FlexContainer from '../../wraps/FlexContainer';

const Registration = () => {
    const { formId } = useForm();

    return (
        <FlexContainer>
            <h1 className="my-4 text-xl font-medium text-center">Registration Form</h1>
            <form>
                {formId.page === 1 && <CreateParent />}
                {formId.page === 2 && <CreateEmergency />}
                {formId.page === 3 && <CreatePlayer />}  
            </form>
        </FlexContainer>
    )
}

export default Registration