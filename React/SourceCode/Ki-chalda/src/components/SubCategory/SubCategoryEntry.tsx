import React from "react";
import DropDownList from "../UI/DropDownList/DropDownList";
interface ISubCategoryEntry {
  subcategoryDetails: any;
  categoryList: any;
  onInputValueChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDropDownChanged: (value: string, name: string) => void;
  onSaveSubCategory: () => void;
  onResetSubCategory: () => void;
}

const SubCategoryEntry = (props: ISubCategoryEntry) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <label>Select Category:</label>

            <DropDownList
              //   handleDropDownevent={(value: string, name: string) => {
              //     alert(`Selected value of  ${name}  is ${value}`);
              //   }}
              handleDropDownevent={props.onDropDownChanged}
              DropDownList={props.categoryList}
              name="category"
              optionLabel="categoryname"
              optionValue="categoryid"
              selectedValue={props.subcategoryDetails.category}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <label>Enter Sub Category Name:</label>

            <input
              type="text"
              name="subcategoryName"
              placeholder="Enter Sub Category Name"
              className="form-control"
              value={props.subcategoryDetails.subcategoryName}
              onChange={props.onInputValueChanged}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm text-right">
          <button
            type="button"
            className="btn btn-success"
            onClick={props.onSaveSubCategory}>
            {props.subcategoryDetails.subcategoryId === 0 ? "Save" : "Update"}
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={props.onResetSubCategory}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryEntry;
