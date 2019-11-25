import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";
//компонент текстового поля, который вставляется в React Final Form и наследуется от FieldRenderProps из React Final Form что бы переопределить стандартное поведение input
interface IProps extends FieldRenderProps<any, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  date = false,
  time = false,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* выводим все свойства IProps input имеет кучу свойств которые пресваиваем этому свойству */}
      <DateTimePicker
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={e => e.preventDefault}
        date={date}
        time={time}
        {...rest}
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

export default DateInput;
