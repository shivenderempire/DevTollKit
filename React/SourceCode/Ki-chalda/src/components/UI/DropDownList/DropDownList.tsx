import React, { useState, useEffect } from "react";
import Select from "react-select";

interface ISelectProps {
  name: string;
  optionLabel: string;
  optionValue: string;
  selectedValue: string;
  DropDownList: any;
  handleDropDownevent: (value: string, name: string) => void;
}
const DropDownList = (props: ISelectProps) => {
  const [ddlSelectedValue, setddlSelectedValue] = useState("0");
  useEffect(() => {
    setddlSelectedValue(
      props.selectedValue === null ||
        props.selectedValue === undefined ||
        props.selectedValue === ""
        ? "0"
        : props.selectedValue,
    );
  }, [props.selectedValue]);

  return (
    <Select
      name={props.name}
      onChange={(e) => {
        setddlSelectedValue(e[props.optionValue]);
        props.handleDropDownevent(e[props.optionValue], props.name);
      }}
      isSearchable={true}
      getOptionLabel={(option) => `${option[props.optionLabel]}`}
      getOptionValue={(option) => `${option[props.optionValue]}`}
      value={
        ddlSelectedValue !== "0" && ddlSelectedValue !== ""
          ? props.DropDownList.filter(
              (filter: any) => filter[props.optionValue] === ddlSelectedValue,
            )
          : {
              [props.optionLabel]: "Select",
              [props.optionValue]: "0",
            }
      }
      defaultValue={{
        [props.optionLabel]: "Select",
        [props.optionValue]: "0",
      }}
      options={props.DropDownList}
      isDisabled={props.DropDownList ? false : true}
      isLoading={props.DropDownList ? false : true}
    />
  );
};
export default DropDownList;
