import "./FormRow.less";
type FormRowProps = {
  label?: string;
  children: React.ReactNode;
};

const FormRow = ({ label, children }: FormRowProps) => {
  return (
    <div className="form-row">
      <label
        htmlFor={(children as React.ReactElement)?.props?.id}
        className="form-row__label"
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormRow;
