/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import FormControls from "./FormControls";

function FormInput({
  handleSubmit,
  isButtonLoading,
  buttonTitle,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button
        disabled={isButtonDisabled || isButtonLoading}
        type="submit"
        className="mt-5 w-full"
      >
        {isButtonLoading ? buttonTitle || "Submit" : "loading"}
      </Button>
    </form>
  );
}

export default FormInput;
