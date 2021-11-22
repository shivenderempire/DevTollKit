import React from "react";

interface IauthorEntry {
  authorDetails: any;
  onInputValueChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveAuthor: () => void;
  onResetAuthor: () => void;
}
const AuhtorEntry = (props: IauthorEntry) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <label>Enter Author Name:</label>

            <input
              type="text"
              name="authorName"
              placeholder="Enter Author Name"
              className="form-control"
              value={props.authorDetails.authorName}
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
            onClick={props.onSaveAuthor}>
            {props.authorDetails.authorId === 0 ? "Save" : "Update"}
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={props.onResetAuthor}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuhtorEntry;
