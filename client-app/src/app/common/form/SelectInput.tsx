import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";
//компонент текстового поля, который вставляется в React Final Form и наследуется от FieldRenderProps из React Final Form что бы переопределить стандартное поведение input
interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}
const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error }
}) => {
  //проверяем если поле нажато и есть ошибка !!-значит возврат не самого свойства а bool есть оно или нет
  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* при выборе данных, выводим в input выбранное */}
      <Select
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />
      {/* если touched если error то выводим label ошибки (черт никогда не привыкну к таким условиям react) */}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
export default SelectInput;
