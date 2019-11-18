import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
//компонент текстового поля, который вставляется в React Final Form и наследуется от FieldRenderProps из React Final Form что бы переопределить стандартное поведение input
interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

//деконструктим свойства класса FieldRenderProps
const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  //проверяем если поле нажато и есть ошибка !!-значит возврат не самого свойства а bool есть оно или нет
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      {/* выводим все свойства IProps input имеет кучу свойств которые пресваиваем этому свойству */}
      <input {...input} placeholder={placeholder} type="text" />
      {/* если touched если error то выводим label ошибки (черт никогда не привыкну к таким условиям react) */}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
