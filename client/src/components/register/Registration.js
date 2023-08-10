import useForm from '../../hooks/useForm';
import CreateParent from './CreateParent';
import CreateEmergency from './CreateEmergency';
import CreatePlayer from './CreatePlayer';


const Registration = () => {
    const { formId, setFormId } = useForm();

   

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="my-4 text-xl font-medium text-center">Registration Form</h1>
            <form>
                <div className="bg-gray-300 p-10 rounded-xl shadow-black shadow-lg mb-8">
                    {formId.page === 1 && <CreateParent />}
                    {formId.page === 2 && <CreateEmergency />}
                    {formId.page === 3 && <CreatePlayer />}
                </div>
            </form>
        </div>
    )

}

export default Registration