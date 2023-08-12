import OverlayBox from "./OverlayBox";
import Button from "./Button";

const VerifyDelete = ({ item = "", handleYes, handleNo }) => {

    return (
        <OverlayBox>
            <p className="my-4 text-logoRed text-lg">{`Are you sure you want to delete ${item}?`}</p>
            <div className="flex gap-2 justify-center">
                <Button style={{ width: "w-1/4" }} handleClick={handleYes}>Yes</Button>
                <Button style={{ width: "w-1/4" }} handleClick={handleNo}>No</Button>
            </div>
        </OverlayBox>
    )

}

export default VerifyDelete;