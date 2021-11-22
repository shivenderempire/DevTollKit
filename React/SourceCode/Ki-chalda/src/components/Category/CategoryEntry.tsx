import React from "react";

interface ICategoryEntry {
  categoryDetails: any;
  onInputValueChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveCategory: () => void;
  onResetCategory: () => void;
}
const CategoryEntry = (props: ICategoryEntry) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <label>Enter Category Name:</label>

            <input
              type="text"
              name="categoryName"
              placeholder="Enter Category Name"
              className="form-control"
              value={props.categoryDetails.categoryName}
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
            onClick={props.onSaveCategory}>
            {props.categoryDetails.categoryId === 0 ? "Save" : "Update"}
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={props.onResetCategory}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryEntry;
