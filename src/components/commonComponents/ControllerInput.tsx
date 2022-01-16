import { Control, Controller, FieldError, FieldValues } from "react-hook-form"
import { Datepicker, Input } from "@ui-kitten/components";
import React from "react";

interface IControllerInput {
    control: Control<FieldValues, object> ,
    errors: FieldError | undefined,
    nameController: any,
    placeholder: string
    isDate: boolean,
    onChangeCustom?: (any: any) => void
  }

export const ControllerInput: React.FC<IControllerInput> = ({ control, errors, nameController, placeholder, isDate, onChangeCustom }) => {
  console.log('ControllerInput');
  
  return(
    <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          isDate ?
            (<Datepicker
              style={{ marginBottom: 10 }}
              date={value}
              onSelect={onChangeCustom == undefined ? onChange : onChangeCustom}
              onBlur={onBlur}
              placement='top'
              placeholder={placeholder}
            />)
            :
            (<Input
              style={[{marginBottom: 10}, errors && { borderColor: "red" }]}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeCustom == undefined ? onChange : onChangeCustom}
              onBlur={onBlur}
              multiline={true}
            />)
  
        )
      }}
      name={nameController}
    />
  )}
