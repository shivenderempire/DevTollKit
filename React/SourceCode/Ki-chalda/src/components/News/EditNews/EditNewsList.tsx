import React from "react";

const EditNewsList = (props: any) => {
  return (
    <div>
      {props.filterData &&
        props.filterData.map((item: any, index: any) => {
          return (
            <React.Fragment key={index}>
              <div className="row">
                <div className="col-sm">
                  <div
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      margin: "10px",
                    }}>
                    <div
                      style={{
                        padding: "10px 5px 10px 5px",
                        width: "100%",
                        backgroundColor: "#ebebeb",
                        lineHeight: 2.0,
                      }}>
                      <div className="row">
                        <div className="col-sm-10">
                          <b> {item.newsheading}</b>
                        </div>
                        <div className="col-sm-2 text-right">
                          <b> {item.newsdatechar}</b>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "10px 10px 10px 5px" }}>
                      <div className="row">
                        <div className="col-sm-12">{item.newssynopsis}</div>
                        <div className="col-sm-8 mt-2">
                          <b>category:</b>
                          {item.category}
                          {item.subcat !== "" && (
                            <React.Fragment>
                              ,<b> Sub-category:</b>
                              {item.subcat}
                            </React.Fragment>
                          )}
                          {item.subsubcat !== "" && (
                            <React.Fragment>
                              ,<b> Sub-Sub-category:</b>
                              {item.subsubcat}
                            </React.Fragment>
                          )}
                        </div>
                        <div className="col-sm-4 mt-1 text-right">
                          <button
                            type="button"
                            className="btn btn-danger ml-2"
                            onClick={() => {
                              props.OnNewsDeleteHandler(item.newsid);
                            }}>
                            Delete News
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default EditNewsList;
