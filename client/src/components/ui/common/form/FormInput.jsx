/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import FormControls from "./FormControls";

function FormInput({
  handleSubmit,
  isButtonLoading,
  buttonTitle = "Submit",
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
        {isButtonLoading ? "loading" : buttonTitle}
      </Button>
    </form>
  );
}

export default FormInput;
