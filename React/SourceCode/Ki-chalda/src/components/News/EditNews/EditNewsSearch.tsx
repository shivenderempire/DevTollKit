import React, { useEffect, useState } from "react";
import DropDownList from "../../UI/DropDownList/DropDownList";
import { IEditNewsSearchParams } from "./IEditNewsSearchParams";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface IEditNewsSearch {
  categoryList: any;
  subcategoryList: any;
  subsubcategoryList: any;
  OnCategoryChanged: (categoryId: string) => void;
  OnSubCategoryChanged: (subcategoryId: string) => void;
  onSearchParameters: (searchParams: IEditNewsSearchParams) => void;
  OnResetSearch: () => void;
}
const EditNewsSearchParam: IEditNewsSearchParams = {
  category: "0",
  subcategory: "",
  subsubcategory: "",
  keyword: "",
  datefrom: undefined,
  dateto: undefined,
};
const EditNewsSearch = (props: IEditNewsSearch) => {
  const [searchParams, setsearchParams] =
    useState<IEditNewsSearchParams>(EditNewsSearchParam);

  const onDropDownChanged = (value: string, name: string) => {
    if (name === "category") {
      setsearchParams((prevstate: any) => ({
        ...prevstate,
        [name]: value,
        subcategory: "",
        subsubcategory: "",
      }));
      props.OnCategoryChanged(value);
    } else if (name === "subcategory") {
      setsearchParams((prevstate: any) => ({
        ...prevstate,
        [name]: value,
        subsubcategory: "",
      }));
      props.OnSubCategoryChanged(value);
    } else if (name === "subsubcategory") {
      setsearchParams((prevstate: any) => ({
        ...prevstate,
        [name]: value,
      }));
    }
  };
  const handleDate = (date: any, name: string) => {
    setsearchParams((prevstate: any) => ({
      ...prevstate,
      [name]: date,
    }));
  };
  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);
  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <label>Select Category</label>
            <DropDownList
              handleDropDownevent={onDropDownChanged}
              DropDownList={props.categoryList}
              name="category"
              optionLabel="text"
              optionValue="value"
              selectedValue={searchParams.category}
            />
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group">
            <label>Select Category</label>
            <DropDownList
              handleDropDownevent={onDropDownChanged}
              DropDownList={props.subcategoryList ? props.subcategoryList : []}
              name="subcategory"
              optionLabel="text"
              optionValue="value"
              selectedValue={searchParams.subcategory}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <label>Select Category</label>
            <DropDownList
              handleDropDownevent={onDropDownChanged}
              DropDownList={
                props.subsubcategoryList ? props.subsubcategoryList : []
              }
              name="subsubcategory"
              optionLabel="text"
              optionValue="value"
              selectedValue={searchParams.subsubcategory}
            />
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group">
            <label>Enter KeyWord(s)</label>
            <input
              type="text"
              className="form-control"
              id="keyword"
              name="keyword"
              value={searchParams.keyword}
              placeholder="Enter your Keywords here....."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setsearchParams((prevstate: any) => ({
                  ...prevstate,
                  keyword: e.target.value,
                }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <label>Select News Date From :</label>
            <br />
            <DatePicker
              isClearable
              placeholderText="Select Date from"
              selected={searchParams.datefrom}
              onChange={
                (date: any) => handleDate(date, "datefrom")
                //setsearchData({ ...searchData, attendanaceDateFrom: date })
              }
              className="form-control"
              maxDate={new Date()}
              dropdownMode="select"
              dateFormat="MM/dd/yyyy"
            />
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group">
            <label>Select News Date to :</label>
            <br />
            <DatePicker
              isClearable
              placeholderText="Select Date to"
              selected={searchParams.dateto}
              onChange={(date: any) => handleDate(date, "dateto")}
              className="form-control"
              maxDate={new Date()}
              dropdownMode="select"
              dateFormat="MM/dd/yyyy"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm text-right">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => props.onSearchParameters(searchParams)}>
            Search
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={() => {
              setsearchParams(EditNewsSearchParam);
              props.OnResetSearch();
            }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNewsSearch;
